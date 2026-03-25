import Button from "../../components/Button";
import WishlistItem from "./WishlistItem";
import eyeIcon from "../../assets/icons/eye-Icon.svg";

function JustForYou() {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 flex flex-col gap-10">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="w-3 h-6 md:w-4 md:h-7 lg:w-5 lg:h-8 bg-[rgb(var(--color-primary-main))] rounded-sm"></span>
          <span className="text-[20px] font-semibold">Just For You</span>
        </div>

        <Button variant="outline">See All</Button>
      </div>

      {/* Products */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        <WishlistItem />
      </div>

    </section>
  );
}

export default JustForYou;