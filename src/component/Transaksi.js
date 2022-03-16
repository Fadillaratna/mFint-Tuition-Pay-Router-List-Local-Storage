import React from 'react';
import $ from "jquery";
import { Badge } from 'react-bootstrap';

class Transaksi extends React.Component {
    constructor() {
        super();
        this.state = {
            transaksi: [
                { id_transaksi: "00234", bulan: "Januari", tahun: "2022", nama: "Aileen Nathania", kelas: "XI RPL1", nominal: "600000", keterangan: "BELUM LUNAS" },
                { id_transaksi: "00253", bulan: "Januari", tahun: "2022", nama: "Calista Zalfa", kelas: "XI TKJ1", nominal: "600000", keterangan: "BELUM LUNAS" },
                { id_transaksi: "00816", bulan: "Januari", tahun: "2022", nama: "Elvira Askana", kelas: "XI RPL1", nominal: "600000", keterangan: "BELUM LUNAS" },
            ],
            id_transaksi: "",
            bulan: "",
            tahun: "",
            nama: "",
            kelas: "",
            nominal: "",
            action: ""
        }
        this.state.filtertransaksi = this.state.transaksi
    }

    bind = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    SaveTransaksi = (event) => {
        event.preventDefault();
        let temp = this.state.transaksi;

        if (this.state.action === "insert") {
            temp.push({
                id_transaksi: Math.random(1, 10000000),
                bulan: this.state.bulan,
                tahun: this.state.tahun,
                nama: this.state.nama,
                kelas: this.state.kelas,
                nominal: this.state.nominal,
                keterangan: this.state.keterangan
            });
        } else if (this.state.action === "update") {
            let index = temp.findIndex(item => item.id_transaksi === this.state.id_transaksi);
            temp[index].bulan = this.state.bulan;
            temp[index].tahun = this.state.tahun;
            temp[index].nama = this.state.nama;
            temp[index].kelas = this.state.kelas;
            temp[index].nominal = this.state.nominal;
        }

        this.setState({ transaksi: temp });
        $("#modal").hide();
    }

    Add = () => {
        $("#modal").show()
        this.setState({
            id_transaksi: "",
            bulan: "",
            tahun: "",
            nama: "",
            kelas: "",
            nominal: "",
            keterangan: "",
            action: "insert"
        });
    }

    Edit = (item) => {
        $("#modal").show()
        this.setState({
            id_transaksi: item.id_transaksi,
            bulan: item.bulan,
            tahun: item.tahun,
            nama: item.nama,
            kelas: item.kelas,
            nominal: item.nominal,
            action: "update"
        });
    }

    Drop = (index) => {
        // beri konfirmasi untuk menghapus data
        if (window.confirm("Apakah anda yakin ingin menghapus data transaksi ini?")) {
            // menghapus data
            let temp = this.state.transaksi;
            // hapus data
            temp.splice(index, 1);
            this.setState({ transaksi: temp });
        }
    }

    searching = event => {
        if (event.keyCode === 13) {
            // 13 adalah kode untuk tombol enter
            let keyword = this.state.keyword.toLowerCase()
            let tempTransaksi = this.state.transaksi
            let result = tempTransaksi.filter(item => {
                return item.id_transaksi.toLowerCase().includes(keyword) ||
                    item.bulan.toLowerCase().includes(keyword) ||
                    item.tahun.toLowerCase().includes(keyword) ||
                    item.nama.toLowerCase().includes(keyword) ||
                    item.kelas.toLowerCase().includes(keyword) ||
                    item.nominal.toLowerCase().includes(keyword)
            })
            this.setState({ filtertransaksi: result })
        }
    }

    Close = () =>{
        $("#modal").hide()
    }

    addToCart = (selectedItem) => {
        // membuat sebuah variabel untuk menampung cart sementara
        let tempCart = []
        let temp = this.state.transaksi;
        // cek eksistensi dari data cart pada localStorage
        // jika item yang dipilih ada pada keranjang belanja


        if (localStorage.getItem("cart") !== null) {
            tempCart = JSON.parse(localStorage.getItem("cart"))
            // JSON.parse() digunakan untuk mengonversi dari string -> array object
        }

        this.setState({
            id_transaksi: selectedItem.id_transaksi,
            bulan: selectedItem.bulan,
            tahun: selectedItem.tahun,
            nama: selectedItem.nama,
            kelas: selectedItem.kelas,
            nominal: selectedItem.nominal,
            keterangan: "LUNAS"
        });
        let index = temp.findIndex(selectedItem => selectedItem.id_transaksi === this.state.id_transaksi);
        temp[index].bulan = this.state.bulan;
        temp[index].tahun = this.state.tahun;
        temp[index].nama = this.state.nama;
        temp[index].kelas = this.state.kelas;
        temp[index].nominal = this.state.nominal;
        temp[index].keterangan = this.state.keterangan
        this.setState({ transaksi: temp });
        let existItem = tempCart.find(item => item.id_transaksi === selectedItem.id_transaksi)
        if(existItem){
            window.confirm("Tagihan spp telah terbayar")
        }else{
            window.confirm("Apakah anda ingin membayar spp?")
            tempCart.push(selectedItem)
            localStorage.setItem("cart", JSON.stringify(tempCart))
        }

        

    }

    render() {
        return (
            <div className="transaksi me-5">
                <div className="dashboard ms-5"><br /><br />
                    <h5 className="card-title display-3 fw-bolder mb-0">TRANSACTION LIST</h5>
                    <p className="card-text lead fs-2 mb-3">mFinT.</p>
                    <input type="text" className="form-control my-2" placeholder="Cari Transaksi" value={this.state.keyword} onChange={ev => this.setState({ keyword: ev.target.value })} onKeyUp={ev => this.searching(ev)} />
                    <br></br>

                    <table className="table">
                        <thead>
                            <tr>
                                <th>ID Transaction</th>
                                <th>Month</th>
                                <th>Year</th>
                                <th>Name</th>
                                <th>Class</th>
                                <th>Nominal</th>
                                <th>Status</th>
                                <th>Option</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.filtertransaksi.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{item.id_transaksi}</td>
                                        <td>{item.bulan}</td>
                                        <td>{item.tahun}</td>
                                        <td>{item.nama}</td>
                                        <td>{item.kelas}</td>
                                        <td>{item.nominal}</td>
                                        <td><Badge bg="danger">{item.keterangan}</Badge></td>
                                        <td>
                                            <button className="btn btn-sm btn-dark m1 me-1" id="light" onClick={() => this.addToCart(item)}>Bayar </button>
                                            <button className="btn btn-sm btn-dark m1" id="dark" onClick={() => this.Drop(index)}> Hapus </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                    <br></br>
                    <button type="button" className="btn btn-dark" id="light" onClick={this.Add} data-toggle="modal" data-target="#modal">Add Transaction</button>


                    <div className="modal" id="modal">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h4 class="modal-title"><b>Transaction Data</b></h4>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => this.Close()}></button>
                                </div>
                                <div class="modal-body">
                                    <form onSubmit={this.SaveTransaksi}>
                                        Month
                                        <input type="text" name="bulan" className="form-control mb-2" onChange={this.bind} value={this.state.bulan} required />
                                        Year
                                        <input type="text" name="tahun" className="form-control mb-2" onChange={this.bind} value={this.state.tahun} required />
                                        Name
                                        <input type="text" name="nama" className="form-control mb-2" onChange={this.bind} value={this.state.nama} required />
                                        Class
                                        <input type="text" name="kelas" className="form-control mb-2" onChange={this.bind} value={this.state.kelas} required />
                                        Nominal
                                        <input type="text" name="nominal" className="form-control mb-2" onChange={this.bind} value={this.state.nominal} required />
                                        Status
                                        <input type="text" name="keterangan" className="form-control mb-2" onChange={this.bind} value={this.state.keterangan} required />
                                        <br></br>
                                        <button className="btn btn-dark btn-block" id="light" type="submit">Simpan</button>
                                    </form>
                                    <br></br>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>


        )
    }
}

export default Transaksi;