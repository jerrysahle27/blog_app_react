import React from "react";
import { parseISO, formatDistanceToNow } from "date-fns";
export interface dateProps {
  timeStamp: string;
}
export const TimeAgo = (props: dateProps) => {
  let timeAgo = "";
  if (props.timeStamp) {
    const date = parseISO(props.timeStamp);
    const timePeriod = formatDistanceToNow(date);
    timeAgo = `${timePeriod} ago`;
  }

  return (
    <span title={props.timeStamp} className="">
      &nbsp; {timeAgo}
    </span>
  );
};
