import React from 'react';

import { Badge } from 'react-bootstrap';

class Laporan extends React.Component {
    constructor() {
        super()
        this.state = {
            cart: [], // untuk menyimpan list cart
        }
    }

    initCart = () => {
        // memanggil data cart pada localStorage
        let tempCart = []
        if (localStorage.getItem("cart") !== null) {
            tempCart = JSON.parse(localStorage.getItem("cart"))
        }
        // memasukkan data cart, user, dan total harga pada state
        this.setState({
            cart: tempCart
        })
    }

    componentDidMount() {
        this.initCart()
    }


    render() {
        return (
            <div className="laporan">
                <div className="dashboard ms-5 me-5"><br /><br />
                    <h5 className="card-title display-3 fw-bolder mb-0">TRANSACTION HISTORY</h5>
                    <p className="card-text lead fs-2 mb-3">mFinT</p>
                    <br></br>
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>ID Transaction</th>
                                <th>Month</th>
                                <th>Year</th>
                                <th>Name</th>
                                <th>Class</th>
                                <th>Nominal</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.cart.map((item, index) =>
                            (
                                <tr key={index}>
                                    <td>{item.id_transaksi}</td>
                                    <td>{item.bulan}</td>
                                    <td>{item.tahun}</td>
                                    <td>{item.nama}</td>
                                    <td>{item.kelas}</td>
                                    <td>{item.nominal}</td>
                                    <td><Badge bg="success">LUNAS</Badge></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>


                </div>
            </div>
        )
    }
}

export default Laporan;