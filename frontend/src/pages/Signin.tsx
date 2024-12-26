import { Auth } from "../components/Auth";
import { Quote } from "../components/Quote";
import Logo from "../components/Logo";
import AppbarLogo from "../components/AppbarLogo";

export const Signin = () => {
  return (
    <div>
      <div className="absolute pt-2 top-0 w-full flex justify-center lg:justify-start lg:pl-3 lg:pt-2">
        <div className="block lg:hidden">
          <Logo />
        </div>

        <div className="hidden lg:block">
          <AppbarLogo />
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div >
          <Auth type="signin" />
        </div>
        <div className="hidden lg:block">
          <Quote />
        </div>
      </div>
    </div>
  );
};