const CardItems = ({ item }) => {
  return (
    <div key={item._id} className="block rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
      <div className="relative overflow-hidden bg-cover bg-no-repeat" data-te-ripple-init="" data-te-ripple-color="light">
        <img className="rounded-t-lg h-52 w-full object-center object-cover" src={item.imagePath} alt="" />
        <a href={`/item/${item._id}`}>
          <div className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-[hsla(0,0%,98%,0.15)] bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-100" />
        </a>
      </div>
      <div className="px-6 pt-5 pb-6">
        <h5 className="mb-2 text-sm h-10 font-bold leading-tight text-neutral-800 dark:text-neutral-50">{item.itemName}</h5>
        <p className="mb-4 text-[0.7rem] h-16 text-neutral-600 dark:text-neutral-200">{item.description.slice(0, 170) + '...'}</p>
        <p className="mb-4 text-[0.9rem] h-2 text-neutral-600 dark:text-neutral-200">{item.price}</p>
        <p className="mb-4 text-[0.9rem] h-2 text-neutral-600 dark:text-neutral-200">{item.weight}</p>
        {/* <div>
          <a href={`/item/${item._id}`} type="button" className="relative rounded pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-primary transition duration-150 ease-in-out hover:translate-x-1" data-te-ripple-init="" data-te-ripple-color="light">
            EXPLORE NOW <span className="">-&gt;</span>
          </a>
        </div> */}
      </div>
    </div>
  )
}

export default CardItems
