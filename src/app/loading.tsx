

const LoadingPage = () => {
    return (
        <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-green-600"></div>

            <div className="text-center">
                <h2 className="text-lg font-semibold text-gray-800">
                    Just a moment...
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                    Loading the page for you.
                </p>
            </div>
        </div>
    );
};

export default LoadingPage;
