interface ButtonProps {
    buttonContent: string;
    variant: "primary"|"secondary"
}

export default function Button({ buttonContent, variant }: ButtonProps) {
    return (
        <div>
            <button className={`flex justify-center align-middle py-2.5 sm:py-4 px-10 outline-1 bodyButton rounded-full text-black bg-white outline-black 
                ${variant === "primary" ? 
                "hover:bg-yellow-pastel hover:drop-shadow-[5px_5px_0px_rgba(255,196,0,1)] active:bg-yellow active:drop-shadow-[5px_5px_0px_rgba(255,255,255,1)]" : 
                "hover:bg-gray-50 hover:drop-shadow-[5px_5px_0px_rgba(150,138,132,1)] active:bg-gray-500 active:drop-shadow-[5px_5px_0px_rgba(255,255,255,1)]"}`}>
                    {buttonContent}
            </button>
        </div>
    );
}