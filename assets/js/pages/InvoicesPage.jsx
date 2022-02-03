//import { set } from "core-js/core/dict"
import moment from "moment"
import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"
import TableLoader from "../components/loaders/TableLoader"
import Pagination from "../components/Pagination"
import InvoicesAPI from "../services/invoicesAPI"

const STATUS_CLASSES = {
    PAID: "success",
    SENT: "info",
    CANCELLED: "danger"
}

const STATUS_LABELS = {
    PAID: "Payée",
    SENT: "Envoyée",
    CANCELLED: "Annulée"
}

const InvoicesPage = props => {
    const [invoices, setInvoices] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");
    const [loadind , setLoading] = useState(true)

    // Permet de récupérer des factures auprès de l'API
    const fetchInvoices = async () => {
        try {
            const data = await  InvoicesAPI.findAll()
            setInvoices(data)
            setLoading(false)
        }catch (error) {
            //console.log(error.response)
            toast.error("Erreur lors du chargement des factures !")
        }
    }

    // Permet de charger les factures au chargement du composant
    useEffect(()=> {
        fetchInvoices()
    }, [])

    // Gestion de changement de page pandant la recherche
    const handlePageChange = page => { setCurrentPage(page) } 

    // fonction pour rechercher une facture
    const handleSearch = ({ currentTarget }) => {
     setSearch(currentTarget.value)
        setCurrentPage(1)
    }

     // supprimer un clients  
   const handleDelete = async id => {
    //  console.log(id);
      const originalInvoices = [...invoices];
      setInvoices(invoices.filter(invoice => invoice.id !== id));

     try {
           await InvoicesAPI.delete(id)
           toast.success("La facture a bien été supprimée")
       } catch(error) {
           //console.log(error.response)
           toast.error("Une erreur est survenue")
           setInvoices(originalInvoices);
       }      
  }
 
    const itemsPerPage = 10;

    // Pour formater la date
    const formatDate = (str) => moment(str).format('DD/MM/YYYY')

    const filteredInvoices = invoices.filter(
        i =>
        i.customer.lastName.toLowerCase().includes(search.toLowerCase()) ||
        i.customer.firstName.toLowerCase().includes(search.toLowerCase()) ||
        i.amount.toString().startsWith(search.toLowerCase()) ||
        STATUS_LABELS[i.status].toLowerCase().includes(search.toLowerCase())
    )

     //Pagination de la liste des clients
   const paginatedInvoices = Pagination.getData(
    filteredInvoices, currentPage, itemsPerPage
    )

    return (
        <>      
            <div className="mb-3 d-flex justify-content-between align-items-center">
                <h1>liste des factures</h1>
                <Link to="/invoices/new" className="btn btn-primary">Créer une facture</Link>
            </div>

            <div className="form-group">
                <input type="text"
                    onChange={handleSearch}
                    value={search}
                    className="form-control" 
                    placeholder="Recherche ..." 
                />
            </div>

            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>Numéro</th>
                        <th>Client</th>
                        <th className="text-center">Date d'envoi</th>
                        <th className="text-center">Status</th>
                        <th className="text-center">Montant</th>
                        <th />
                    </tr>
                </thead>

                {!loadind && (
                <tbody>
                   {paginatedInvoices.map(invoice =>
                    <tr key={invoice.id}>
                        <td>{invoice.chrono}</td>
                        <td>
                            <Link to={"/invoices/" + invoice.id}>
                            {invoice.customer.firstName} {invoice.customer.lastName}
                            </Link>                                      
                        </td>
                        <td className="text-center">{formatDate(invoice.sentAt)}</td>
                        <td className="text-center">
                            <span className={"badge bg-" + STATUS_CLASSES[invoice.status]}>
                               {STATUS_LABELS[invoice.status]}</span>
                        </td>
                        <td className="text-center">
                            {invoice.amount.toLocaleString()} €
                        </td>
                        <td>
                            <Link to={"/invoices/" + invoice.id} className="btn btn-sm btn-primary mr-1">modifier</Link>
                            
                            <button className="btn btn-sm btn-danger"
                                onClick={()=> handleDelete(invoice.id)}
                            >supprimer</button>
                        </td>
                    </tr>
                   )}
                </tbody>
                )}
            </table>

            { loadind && <TableLoader/> }
            {itemsPerPage < filteredInvoices.length && (
                
            <Pagination currentPage={currentPage} itemsPerPage={itemsPerPage} 
            onPageChanged={handlePageChange} length={filteredInvoices.length} />

            )}       
        </>
    )
}

export default InvoicesPage