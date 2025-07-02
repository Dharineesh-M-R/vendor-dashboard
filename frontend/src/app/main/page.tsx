import { LayoutDashboard, Bell, Users, Car, FileText, Table } from 'lucide-react';

export default function MainPage() {
  return (
    <>
      <div className="grid grid-cols-12 gap-x-2 gap-y-2 h-screen">
        <aside className="col-span-2 border-r p-6 space-y-6 shadow-sm">
          <div className="text-xl text-black font-bold font-sans">Vendor Panel</div>
          <nav className="space-y-4">
            <a href="#dashboard" className="flex gap-2 items-center text-gray-500 hover:text-black">
              <LayoutDashboard size={18} />
              <span>Dashboard</span>
            </a>
            <a href="#booking" className="flex gap-2 items-center text-gray-500 hover:text-black">
              <Bell size={18} />
              <span>Bookings</span>
            </a>
            <a href="#drivers" className="flex gap-2 items-center text-gray-500 hover:text-black">
              <Users size={18} />
              <span>Drivers</span>
            </a>
            <a href="#vehicles" className="flex gap-2 items-center text-gray-500 hover:text-black">
              <Car size={18} />
              <span>Vehicles</span>
            </a>
            <a href="#invoices" className="flex gap-2 items-center text-gray-500 hover:text-black">
              <FileText size={18} />
              <span>Invoices</span>
            </a>
            <a href="#customtables" className="flex gap-2 items-center text-gray-500 hover:text-black">
              <Table size={18} />
              <span>Custom Tables</span>
            </a>
          </nav>
        </aside>
        <main className='col-span-10 bg-white p-6 space-y-6'>
          <div className='col-span-10 text-black font-semibold text-2xl '>Dashboard Overview</div>
          <hr />
          <div className='flex flex-wrap grid-cols-10 gap-4'>
          <div className=" w-65 rounded-2xl shadow-lg p-4 bg-white"><div>Upcoming Bookings</div><br /><div>...</div></div>
          <div className=" w-65 rounded-2xl shadow-lg p-4 bg-white"><div>Pending Invoices</div><br /><div>...</div></div>
          <div className=" w-65 rounded-2xl shadow-lg p-4 bg-white"><div>Drivers Active</div><br /><div>...</div></div>
          <div className=" w-65 rounded-2xl shadow-lg p-4 bg-white"><div>Vehicles Available</div><br /><div>...</div></div>
          </div>
          <div className='flex flex-wrap gap-5 border-2 w-max p-2 bg-gray-50 text-center rounded-lg'>
            <h1 className='hover:bg-white p-2'>Live Bookings</h1>
            <h1 className='hover:bg-white p-2'>Booking History</h1>
            <h1 className='hover:bg-white p-2'>Custom Tables</h1>
          </div>
        </main>
      </div>
    </>
  );
}
