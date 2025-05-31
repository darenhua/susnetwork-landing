import Image from "next/image";
import Link from "next/link";

export default function Sus({
    className,
    width,
    height,
}: {
    className: string;
    width: number;
    height: number;
}) {
    return (
        <Link
            target="_blank"
            href="https://www.linkedin.com/in/daren-hua/"
            className="cursor-pointer"
        >
            <Image
                src="/sus.webp"
                alt="among us sus"
                width={width}
                height={height}
                className={className}
            />
        </Link>
    );
}
