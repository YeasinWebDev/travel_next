
import Image from "next/image";
import HeaderSection from "../shared/HeaderSection";

const demoDestinations = [
  {
    _id: "1",
    name: "Cox's Bazar",
    location: "Chattogram, Bangladesh",
    description: "World’s longest natural sea beach with stunning views.",
    image: ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYHHcFtyS_q8tUlsCgx7veW2v8Bor8e-vUKw&s"],
    price: 120,
    bestTimeToVisit: "November - March",
  },
  {
    _id: "2",
    name: "Sajek Valley",
    location: "Rangamati, Bangladesh",
    description: "The queen of hills with unforgettable cloud views.",
    image: ["/images/demo2.jpg"],
    price: 150,
    bestTimeToVisit: "September - February",
  },
  {
    _id: "3",
    name: "Sylhet Tea Gardens",
    location: "Sylhet, Bangladesh",
    description: "Green paradise with tea estates & peaceful nature.",
    image: ["/images/demo3.jpg"],
    price: 90,
    bestTimeToVisit: "Year-round",
  },
  {
    _id: "4",
    name: "Sylhet Tea Gardens",
    location: "Sylhet, Bangladesh",
    description: "Green paradise with tea estates & peaceful nature.",
    image: ["/images/demo3.jpg"],
    price: 90,
    bestTimeToVisit: "Year-round",
  },
];

function Destinations() {
  return (
    <div className="px-6 md:px-20 py-16 bg-gray-50">
      {/* Header */}
      <HeaderSection title="Explore Top Destinations" description="Discover breathtaking locations, hidden gems, and unforgettable travel experiences across Bangladesh." />

      {/* Card Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {demoDestinations.map((item) => (
          <div key={item._id} className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer">
            <div className="relative h-56 w-full">
              <Image src={item.image[0]} alt={item.name} fill className="object-cover" />
            </div>

            <div className="p-5">
              <h2 className="text-xl font-semibold">{item.name}</h2>
              <p className="text-sm text-gray-500">{item.location}</p>

              <p className="text-gray-700 text-sm mt-3 line-clamp-2">{item.description}</p>

              <div className="mt-4 flex justify-between items-center">
                <span className="font-bold text-primary">${item.price}</span>
                <button className="px-4 py-2 text-sm bg-primary text-white rounded-sm transition cursor-pointer hover:scale-105 duration-300">View Details</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Destinations;
