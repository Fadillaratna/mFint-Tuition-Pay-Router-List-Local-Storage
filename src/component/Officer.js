import React from 'react'
import $ from "jquery";


class Officer extends React.Component {
    constructor() {
        super();
        this.state = {
            petugas: [
                { nip: "17388001 202212 1 001", nama: "Leivy Nesyra", alamat: "Jl Ahmad Basuki 19, Jakarta Pusat", telepon: "082003449111" },
                { nip: "17388001 202212 1 002", nama: "Chessta Raynend", alamat: "Jl Ir Soekarno 33, Jakarta Selatan", telepon: "085601538025" },
                { nip: "17388001 202212 1 003", nama: "Zee Jeyna", alamat: " Jl Tri Kartini 07, Bekasi", telepon: "081950999661" },
            ],
            nip: "",
            nama: "",
            alamat: "",
            telepon: "",
            action: ""
        }
        this.state.filterpetugas = this.state.petugas
    }

    bind = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    SavePetugas = (event) => {
        event.preventDefault();
        let temp = this.state.petugas;

        if (this.state.action === "insert") {
            temp.push({
                nip: this.state.nip,
                nama: this.state.nama,
                alamat: this.state.alamat,
                telepon: this.state.telepon
            });
        } else if (this.state.action === "update") {
            let index = temp.findIndex(item => item.nip === this.state.nip);
            temp[index].nama = this.state.nama;
            temp[index].alamat = this.state.alamat;
            temp[index].telepon = this.state.telepon;
        }

        this.setState({ petugas: temp });
        $("#modal").hide()
    }

    Add = () => {
        $("#modal").show()
        this.setState({
            nip: "",
            nama: "",
            alamat: "",
            telepon: "",
            action: "insert"
        });
    }

    Edit = (item) => {
        $("#modal").show()
        this.setState({
            nip: item.nip,
            nama: item.nama,
            alamat: item.alamat,
            telepon: item.telepon,
            action: "update"
        });
    }

    Drop = (index) => {
        // beri konfirmasi untuk menghapus data
        if (window.confirm("Apakah anda yakin ingin menghapus data petugas ini?")) {
            // menghapus data
            let temp = this.state.petugas;
            // hapus data
            temp.splice(index, 1);
            this.setState({ petugas: temp });
        }
    }

    searching = event => {
        if (event.keyCode === 13) {
            // 13 adalah kode untuk tombol enter
            let keyword = this.state.keyword.toLowerCase()
            let tempPetugas = this.state.petugas
            let result = tempPetugas.filter(item => {
                return item.nip.toLowerCase().includes(keyword) ||
                    item.nama.toLowerCase().includes(keyword) ||
                    item.alamat.toLowerCase().includes(keyword) ||
                    item.telepon.toLowerCase().includes(keyword)
            })
            this.setState({ filterpetugas: result })
        }
    }

    Close = () =>{
        $("#modal").hide()
    }

    render() {
        return (
            <div className="petugas me-5">
                <div className="dashboard ms-5"><br/><br/>
                    <h5 className="card-title display-3 fw-bolder mb-0">OFFICER LIST</h5>
                    <p className="card-text lead fs-2 mb-3">mFinT.</p>
                    <button type="button" className="btn btn-dark mb-3" id="light" onClick={this.Add} data-toggle="modal" data-target="#modal">Add Officer</button>


                    <input type="text" className="form-control my-2" placeholder="Search Admin" value={this.state.keyword} onChange={ev => this.setState({ keyword: ev.target.value })} onKeyUp={ev => this.searching(ev)} />
                    <br />

                    <table className="table">
                        <thead>
                            <tr>
                                <th>NIP</th>
                                <th>Name</th>
                                <th>Address</th>
                                <th>Phone</th>
                                <th>Option</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.filterpetugas.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{item.nip}</td>
                                        <td>{item.nama}</td>
                                        <td>{item.alamat}</td>
                                        <td>{item.telepon}</td>
                                        <td>
                                            <button className="btn btn-sm btn-dark m1 me-1" id="light" onClick={() => this.Edit(item)} data-toggle="modal" data-target="#modal"><i className="fa fa-pencil"></i></button>
                                            <button className="btn btn-sm btn-dark m1"  id="dark" onClick={() => this.Drop(index)}><i className="fa fa-trash"></i></button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>

                <div className="modal" id="modal">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h4 class="modal-title"><b>Admin Data</b></h4>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => this.Close()}></button>
                            </div>
                            <div class="modal-body">
                                <form onSubmit={this.SavePetugas}>
                                    NIP
                                    <input type="text" name="nip" className="form-control mb-2" onChange={this.bind} value={this.state.nip} required />
                                    Name
                                    <input type="text" name="nama" className="form-control mb-2" onChange={this.bind} value={this.state.nama} required />
                                    Address
                                    <input type="text" name="alamat" className="form-control mb-2" onChange={this.bind} value={this.state.alamat} required />
                                    Phone
                                    <input type="text" name="telepon" className="form-control mb-2" onChange={this.bind} value={this.state.telepon} required />
                                    <br></br>
                                    <button className="btn btn-dark btn-block"  id="light" type="submit">Save</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

            </div>


        )
    }
}

export default Officer;