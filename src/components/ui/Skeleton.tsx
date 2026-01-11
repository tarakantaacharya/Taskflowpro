export const TaskCardSkeleton = () => {
  return (
    <div className="rounded-xl border border-gray-200 dark:border-gray-800 p-4 bg-white dark:bg-gray-900 animate-pulse">
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-3" />
      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-5/6 mb-2" />
      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-2/3" />
      <div className="mt-4 flex gap-2">
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-16" />
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-20" />
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-24" />
      </div>
    </div>
  );
};
