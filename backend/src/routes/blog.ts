import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { verify } from "hono/jwt";
import { createBlogInput, updateBlogInput } from "@whysatyam/medium-common";

export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
  };
}>();

// middleware
blogRouter.use("/*", async (c, next) => {
  const jwt = c.req.header("Authorization");
  if (!jwt) {
    c.status(401);
    return c.json({
      error: "Unauthorized",
    });
  }

  try {
    const token = jwt.split(" ")[1];
    const payload = await verify(token, c.env?.JWT_SECRET);
    c.set("userId", (payload.id as unknown) as string);

    await next();
  } catch (err) {
    c.status(401);
    return c.json({
      error: "Unauthorized",
    });
  }
});

blogRouter.post("/", async (c) => {
  const body = await c.req.json();
  const { success } = createBlogInput.safeParse(body);
  if (!success) {
    c.status(411);
    return c.json({
      error: "Input Validation Failed",
    });
  }

  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const author = c.get("userId");
  const blog = await prisma.post.create({
    data: {
      title: body.title,
      content: body.content,
      authorId: author,
    },
  });
  return c.json(blog);
});

blogRouter.put("/", async (c) => {
  const body = await c.req.json();
  const { success } = updateBlogInput.safeParse(body);
  if (!success) {
    c.status(411);
    return c.json({
      error: "Input Validation Failed",
    });
  }
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const blog = await prisma.post.update({
    where: {
      id: body.id,
    },
    data: {
      title: body.title,
      content: body.content,
    },
  });
  return c.json({ blog });
});

blogRouter.get("/bulk", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const blogs = await prisma.post.findMany({
      select: {
        content: true,
        title: true,
        id: true,
        author: {
          select: {
            name: true,
          },
        },
      },
    });
    return c.json({
      blogs,
    });
  } catch (error) {
    c.status(411);
    return c.json({
      error: "Error while fetching blogs",
    });
  }
});

blogRouter.get("/:id", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const param = c.req.param("id");

  try {
    const blog = await prisma.post.findFirst({
      where: {
        id: param,
      },
      select: {
        content: true,
        title: true,
        id: true,
        author: {
          select: {
            name: true,
          },
        },
      },
    });
    if (!blog) {
      c.status(404);
      return c.json({
        error: "Blog not found",
      });
    }
    return c.json({
      blog,
    });
  } catch (error) {
    c.status(411);
    return c.json({
      error: "Error while fetching blog",
    });
  }
});