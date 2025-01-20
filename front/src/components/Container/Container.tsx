import { ContainerProps } from "@/types/components.types";

export default function Container({ children, styles }: ContainerProps) {
    return <>
        <div className={`container mx-auto ${styles}`}>
            {children}
        </div>
    </>;
};