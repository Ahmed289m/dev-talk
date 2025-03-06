export default function PaginationLoader() {
  return (
    <div className="flex justify-center py-8">
      <div className="relative">
        <div className="absolute inset-0 backdrop-blur-xl"></div>
        <div className="relative bg-gray-800/80 backdrop-blur-lg rounded-lg px-6 py-4 border border-gray-600/50 shadow-xl">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-ping"></div>
            <div
              className="w-2 h-2 bg-green-500 rounded-full animate-ping"
              style={{ animationDelay: "0.2s" }}
            ></div>
            <div
              className="w-2 h-2 bg-green-500 rounded-full animate-ping"
              style={{ animationDelay: "0.4s" }}
            ></div>
            <span className="text-gray-300 font-mono text-sm ml-2">
              Loading more posts...
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
