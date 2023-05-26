import { Pagination } from "@mui/material";

export default function PaginationComponent(props: {
  count: number;
  allResults: number;
}) {
  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing <span className="font-medium">1</span> to{" "}
            <span className="font-medium">5</span> of{" "}
            <span className="font-medium">{props.allResults}</span> results
          </p>
        </div>
        <div>
          <Pagination
            count={props.count > 0 ? props.count : 1}
            color="primary"
          />
        </div>
      </div>
    </div>
  );
}
