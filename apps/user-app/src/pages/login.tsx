import { GalleryVerticalEnd } from "lucide-react";

import { LoginForm } from "@/components/login-form";

type PropTypes = {
  page: string;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
};
export default function LoginPage(props: PropTypes) {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-3">
        <a className="flex items-center gap-2 self-center font-medium">
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <GalleryVerticalEnd className="size-4" />
          </div>
          OpenWise
        </a>
        <LoginForm
          loading={props.loading}
          setLoading={props.setLoading}
          page={props.page}
        />
      </div>
    </div>
  );
}
