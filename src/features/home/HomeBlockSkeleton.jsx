/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */

function HomeBlockSkeleton({ className = "" }) {
  return (
    <div
      className={`flex w-full min-w-0 justify-center overflow-x-hidden py-10 md:py-12 ${className}`}
    >
      <div className="mx-5 h-48 w-full max-w-[1240px] animate-pulse rounded-md bg-[rgb(var(--color-grey))] md:mx-10 md:h-64" />
    </div>
  );
}

export default HomeBlockSkeleton;
