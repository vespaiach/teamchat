import StatusIndicator from "~/components/StatusIndicator";
import useLoggedInUser from "~/hooks/useLoggedInUser";

export default function LoggedInUser() {
  const loggedInUser = useLoggedInUser();
  const name = loggedInUser ? `${loggedInUser.firstName} ${loggedInUser.lastName}` : "Guest";

  return (
    <div className="p-3 border-t border-gray-200 dark:border-gray-700">
      <div className="flex items-center space-x-3 px-2 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-colors duration-200">
        <div className="relative">
          <div className="w-8 h-8 rounded flex items-center justify-center text-sm font-medium text-white bg-primary">
            JD
          </div>
          <div className="absolute -bottom-1 -right-1">
            <StatusIndicator status="online" />
          </div>
        </div>
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-900 dark:text-white">{name}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">Available</p>
        </div>
      </div>
    </div>
  );
}
