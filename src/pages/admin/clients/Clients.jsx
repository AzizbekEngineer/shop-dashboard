import React, { useEffect, useState } from "react";
import {
  Search,
  Download,
  Plus,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import "./clients.scss";
import { IoMdSettings } from "react-icons/io";
import { VscDebugRestart } from "react-icons/vsc";

const Clients = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  console.log(data);

  useEffect(() => {
    getCalculations();
  }, []);

  const getCalculations = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:3000/calculations");
      const result = await res.json();
      setData(result);
    } catch (err) {
      console.log("Xatolik:", err);
    } finally {
      setLoading(false);
    }
  };

  const [clients] = useState([
    {
      id: 1,
      firstName: "Aziz",
      lastName: "Karimov",
      phone: "+998901234567",
      giftsCount: 5,
      registerDate: "2024-01-15",
    },
    {
      id: 2,
      firstName: "Dilnoza",
      lastName: "Rahimova",
      phone: "+998907654321",
      giftsCount: 3,
      registerDate: "2024-02-20",
    },
    {
      id: 3,
      firstName: "Bobur",
      lastName: "Tursunov",
      phone: "+998909876543",
      giftsCount: 8,
      registerDate: "2024-03-10",
    },
    {
      id: 4,
      firstName: "Malika",
      lastName: "Alimova",
      phone: "+998901112233",
      giftsCount: 2,
      registerDate: "2024-04-05",
    },
    {
      id: 5,
      firstName: "Jasur",
      lastName: "Normatov",
      phone: "+998905556677",
      giftsCount: 12,
      registerDate: "2024-05-12",
    },
    {
      id: 6,
      firstName: "Sevara",
      lastName: "Usmanova",
      phone: "+998903334455",
      giftsCount: 6,
      registerDate: "2024-06-18",
    },
    {
      id: 7,
      firstName: "Otabek",
      lastName: "Sharipov",
      phone: "+998902223344",
      giftsCount: 4,
      registerDate: "2024-07-22",
    },
    {
      id: 8,
      firstName: "Nilufar",
      lastName: "Ergasheva",
      phone: "+998908889999",
      giftsCount: 9,
      registerDate: "2024-08-30",
    },
  ]);

  const filteredClients = clients.filter(
    (client) =>
      (client.firstName?.toLowerCase() || "").includes(
        searchTerm.toLowerCase()
      ) ||
      (client.lastName?.toLowerCase() || "").includes(
        searchTerm.toLowerCase()
      ) ||
      (client.phone || "").includes(searchTerm)
  );

  const totalPages = Math.ceil(filteredClients.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedClients = filteredClients.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    // <div className="clients">
    //   <div className="clients-header">
    //     <div className="clients-header-controls">
    //       <div className="clients-header-controls-search-box">
    //         <Search
    //           className="clients-header-controls-search-box-icon"
    //           size={18}
    //         />
    //         <input
    //           type="text"
    //           placeholder="Search"
    //           value={searchTerm}
    //           onChange={(e) => setSearchTerm(e.target.value)}
    //           className="clients-header-controls-search-box-input"
    //         />
    //       </div>

    //       <div className="clients-header-controls-action-buttons">
    //         <button className="btn-action btn-download">
    //           <VscDebugRestart />
    //         </button>
    //         <button className="btn-action btn-add">
    //           <IoMdSettings />
    //         </button>
    //       </div>
    //     </div>
    //   </div>

    //   <div className="clients-table">
    //     <div className="clients-table-wrapper">
    //       <table className="clients-table-wrapper-container">
    //         <thead>
    //           <tr>
    //             <th>First name</th>
    //             <th>Last name</th>
    //             <th>Phone number</th>
    //             <th>Gifts count</th>
    //             <th>Register date</th>
    //             <th>Action</th>
    //           </tr>
    //         </thead>

    //         <tbody>
    //           {paginatedClients.length > 0 ? (
    //             paginatedClients.map((client) => (
    //               <tr key={client.id}>
    //                 <td>{client.firstName}</td>
    //                 <td>{client.lastName}</td>
    //                 <td>{client.phone}</td>
    //                 <td>{client.giftsCount}</td>
    //                 <td>{client.registerDate}</td>
    //                 <td>
    //                   <button className="btn-view">View</button>
    //                 </td>
    //               </tr>
    //             ))
    //           ) : (
    //             <tr>
    //               <td colSpan="6" className="no-data">
    //                 <div className="loading-spinner"></div>
    //                 <p>No clients found</p>
    //               </td>
    //             </tr>
    //           )}
    //         </tbody>
    //       </table>
    //     </div>

    //     <div className="clients-pagination">
    //       <div className="clients-pagination-controls">
    //         <button
    //           onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
    //           disabled={currentPage === 1}
    //           className="clients-pagination-controls-btn"
    //         >
    //           <ChevronLeft size={18} />
    //         </button>
    //         <span className="clients-pagination-controls-current">
    //           {currentPage}
    //         </span>
    //         <button
    //           onClick={() =>
    //             setCurrentPage((prev) => Math.min(totalPages, prev + 1))
    //           }
    //           disabled={currentPage === totalPages}
    //           className="clients-pagination-controls-btn"
    //         >
    //           <ChevronRight size={18} />
    //         </button>
    //       </div>
    //       <div className="clients-pagination-info">
    //         <span>{itemsPerPage} / page</span>
    //         <select
    //           value={itemsPerPage}
    //           onChange={(e) => {
    //             setItemsPerPage(Number(e.target.value));
    //             setCurrentPage(1);
    //           }}
    //           className="clients-pagination-info-select"
    //         >
    //           <option value={5}>5</option>
    //           <option value={10}>10</option>
    //           <option value={20}>20</option>
    //           <option value={50}>50</option>
    //         </select>
    //       </div>
    //     </div>
    //   </div>
    // </div>

    <div>
      <h2>Hisob-kitoblar</h2>

      {loading && <p>Yuklanmoqda...</p>}

      {data.map((item) => (
        <div key={item.id}>
          <h4>{item.name}</h4>
          <p>{item.amount} so‘m</p>
          <p>{item.date}</p>
        </div>
      ))}
    </div>
  );
};

export default Clients;
