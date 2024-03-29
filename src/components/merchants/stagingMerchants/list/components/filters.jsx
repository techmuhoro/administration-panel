import PopoverMenuBtn from "@/atoms/PopoverMenuBtn";

function Filters() {
  return (
    <PopoverMenuBtn renderMenu={<h3>Filters</h3>} text="Noe filtex">
      Filter Now
    </PopoverMenuBtn>
  );
}

export default Filters;
