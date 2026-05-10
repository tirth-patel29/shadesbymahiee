import { toast as sonnerToast, ExternalToast } from "sonner";

export interface Toast {
  title?: string;
  description?: string;
  variant?: "default" | "destructive";
}

export const useToast = () => {
  const toast = (options: Toast & ExternalToast) => {
    const { title, description, variant = "default" } = options;
    
    if (variant === "destructive") {
      sonnerToast.error(title || description || "Error", {
        description: description && title ? description : undefined,
      });
    } else {
      sonnerToast.success(title || description || "Success", {
        description: description && title ? description : undefined,
      });
    }
  };

  return { toast };
};
