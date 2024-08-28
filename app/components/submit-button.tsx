import { Button, ButtonProps } from "@/components/ui/button";
import { useFormStatus } from "react-dom";

export default function SubmitButton({ children, ...props }: ButtonProps) {
    const { pending } = useFormStatus();
    return <Button {...props}>{pending ? "Loading..." : children}</Button>;
}
