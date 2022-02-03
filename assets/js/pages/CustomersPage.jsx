import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import TableLoader from '../components/loaders/TableLoader';
import Pagination from '../components/Pagination';
import CustomersAPI from '../services/customersAPI';
//import React,  from 'react'


const CustomersPage = props => {
    const [customers, setCustomers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");
    const [loadind , setLoading] = useState(true)

// fonction pour recuperer les clients
   const fetchCustomers = async () => {
       try {
           const data = await CustomersAPI.findAll()
            setCustomers(data)
            setLoading(false)
       }catch (error){
          // console.log(error.response)
          toast.error("Impossible de charger les clients")
       }
   } 

// au moment de chargement , il recupère les clients
   useEffect(() => {
        fetchCustomers()
   }, [])

 // supprimer un clients  
   const handleDelete = async id => {
     //  console.log(id);
       const originalCustomers = [...customers];
       setCustomers(customers.filter(customer => customer.id !== id));

      try {
            await CustomersAPI.delete(id)
            toast.success("Le client a bien été supprimée")
        } catch(error) {
            setCustomers(originalCustomers);
            toast.error("La suppression du client n'a pas pu fonctionner")
        }      
   }

        const handlePageChange = page => { setCurrentPage(page) } 

   // fonction pour chercher un client
   const handleSearch = ({ currentTarget }) => {
    setSearch(currentTarget.value)
       setCurrentPage(1)
   }

   const itemsPerPage = 10;

   // Ici je filtre les client en fonction de la recherche
   const filteredCustomers = customers.filter(
       c => 
       c.firstName.toLowerCase().includes(search.toLowerCase()) ||
       c.lastName.toLowerCase().includes(search.toLowerCase()) ||
       c.email.toLowerCase().includes(search.toLowerCase()) ||
       ( c.company && c.company.toLowerCase().includes(search.toLowerCase()))
      
   );

   //Pagination de la liste des clients
   const paginatedCustomers = Pagination.getData(
       filteredCustomers, currentPage, itemsPerPage
   )


    return ( 
        <>
        <div className="mb-3 d-flex justify-content-between align-items-center">
        <h1>liste des clients</h1>
        <Link to="/customers/new" className="btn btn-primary">Créer un Client</Link>
        </div>

        <div className="form-group">
            <input type="text"
                onChange={handleSearch}
                value={search}
                className="form-control" 
                placeholder="Recherche ..." 
            />
        </div>

    <table className="table tavnle-hover">
        <thead>
                <tr>
                    <th>Id</th>
                    <th>Client</th>
                    <th>Email</th>
                    <th>Entreprise</th>
                    <th className="text-center">Facture</th>
                    <th className="text-center">Montant</th>
                    <th />
                </tr>
            
        </thead>

        {!loadind && ( <tbody>
        {paginatedCustomers.map(customer => (
                <tr key={customer.id}>
                <td>{customer.id}</td>
                <td>
                <Link to={"/customers/" + customer.id}>
                        {customer.firstName} {customer.lastName}
                </Link>        
                </td>
                <td>{customer.email}</td>
                <td>{customer.company}</td>
                <td className="text-center">
                    <span className="badge bg-primary">
                    {customer.invoices.length}
                    </span>
                </td>
                <td className="text-center">{customer.totalAmount.toLocaleString()} € </td>
                <td>
                <Link to={"/customers/" + customer.id} className="btn btn-sm btn-primary mr-1">modifier</Link>
                         

                    <button
                     onClick={()=> handleDelete(customer.id)}
                      disabled={customer.invoices.length > 0} className="btn btn-danger">Supprimer
                     </button>
                </td>
            </tr>
        )) }
        </tbody> )}
    </table>
            { loadind && <TableLoader/> }

            {itemsPerPage < filteredCustomers.length && (

                <Pagination currentPage={currentPage} 
                            itemsPerPage={itemsPerPage} 
                            length={filteredCustomers.length}
                            onPageChanged={handlePageChange} /> 

            )}   
    </>   
    )
}

export default CustomersPage