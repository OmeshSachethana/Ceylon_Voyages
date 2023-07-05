const Footer = () => {
  const navigation = [
    { name: 'Home', href: '#', current: false },
    { name: 'Tours', href: '#', current: true },
    { name: 'Blogs', href: '#', current: false },
    { name: 'Feedback and reviews', href: '#', current: false },
  ]

  return (
    <>
      <footer className="bg-white rounded-lg shadow dark:bg-gray-900 ">
        <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
          <div className="sm:flex sm:items-center sm:justify-between">
            <a href="https://flowbite.com/" className="flex items-center mb-4 sm:mb-0">
              <h1 className="text-2xl font-semibold text-gray-800">Ceylon Voyages</h1>
            </a>
            <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
              {navigation.map((item, index) => (
                <li key={index}>
                  <a href={item.href} className={`${item.current && 'underline'} mr-4 hover:underline md:mr-6`}>
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
          <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
            © 2023
            <a href="/home" className="hover:underline">
              Ceylon Voyages™
            </a>
            . All Rights Reserved.
          </span>
        </div>
      </footer>
    </>
  )
}

export default Footer
