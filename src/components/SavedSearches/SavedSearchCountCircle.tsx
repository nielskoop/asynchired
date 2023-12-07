
interface CircleCountProps {
  postsCount: number | undefined;
}

export const SavedSearchCountCircle: React.FC<CircleCountProps> = ({ postsCount }) => {
  return (
    <div className=" circle-aspect relative flex w-full animate-popIn items-center justify-center rounded-full bg-white text-center shadow-inner">
      <p className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform text-6xl font-semibold sm:text-4xl lg:text-6xl">
        {postsCount} matches
      </p>
    </div>
  );
};
