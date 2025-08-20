export default function TopPostsShimmerComp() {
    return (
        <div className="space-y-3 py-8 w-full lg:max-w-[30vw]">
            {[...Array(5)].map((_, index) => (
                <div key={index} className="flex items-center">
                    <span className="mr-2 h-6 w-6 bg-gray-300 rounded animate-pulse"></span>
                    <div className=" h-4 w-full bg-gray-300 rounded animate-pulse lg:w-[30vw]"></div>
                </div>
            ))}
        </div>
    );
}
