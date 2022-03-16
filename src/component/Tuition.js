import React from 'react';
import $ from "jquery";

class Tuition extends React.Component {
    constructor() {
        super()
        this.state = {
            spp: [
                {
                    id_spp: "10001", judul: "SPP28-2022", angkatan: "28",
                    tahun: "2022", harga: 500000,
                    cover: "https://cdn3d.iconscout.com/3d/premium/thumb/online-payment-4000052-3312433@0.png"
                },
                {
                    id_spp: "10002", judul: "SPP29-2022", angkatan: "29",
                    tahun: "2022", harga: 600000,
                    cover: "https://cdn3d.iconscout.com/3d/premium/thumb/mobile-payment-4000053-3312434@0.png"
                },
                {
                    id_spp: "10003", judul: "SPP30-2022", angkatan: "30",
                    tahun: "2022", harga: 550000,
                    cover: "https://cdn3d.iconscout.com/3d/premium/thumb/pay-per-click-4454355-3718864.png"
                },


            ],
            action: "",
            id_spp: "",
            judul: "",
            angkatan: "",
            tahun: "",
            harga: 0,
            cover: "",
            selectedItem: null,
        }
        this.state.filterspp = this.state.spp

    }

    Add = () => {
        $("#modal_spp").show()
        this.setState({
            id_spp: Math.random(1, 10000000),
            judul: "",
            angkatan: "",
            tahun: "",
            cover: "",
            harga: 0,
            action: "insert"
        });
    }

    Edit = (item) => {
        $("#modal_spp").show()
        this.setState({
            id_spp: item.id_spp,
            judul: item.judul,
            angkatan: item.angkatan,
            tahun: item.tahun,
            harga: item.harga,
            cover: item.cover,
            action: "update"
        });
    }

    Save = (event) => {
        event.preventDefault();
        let temp = this.state.spp

        if (this.state.action === "insert") {
            temp.push({
                id_spp: this.state.id_spp,
                judul: this.state.judul,
                angkatan: this.state.angkatan,
                tahun: this.state.tahun,
                cover: this.state.cover,
                harga: this.state.harga,
            });
        } else if (this.state.action === "update") {
            let index = temp.findIndex(item => item.id_spp === this.state.id_spp);
            temp[index].judul = this.state.judul;
            temp[index].angkatan = this.state.angkatan;
            temp[index].tahun = this.state.tahun;
            temp[index].cover = this.state.cover;
            temp[index].harga = this.state.harga;
        }
        this.setState({ spp: temp })
        // menutup komponen modal_spp
        $("#modal_spp").hide()
    }

    Drop = (item) => {
        // beri konfirmasi untuk menghapus data
        if (window.confirm("Apakah anda yakin ingin menghapus data spp ini?")) {
            // menghapus data
            let tempSpp = this.state.spp
            // posisi index data yg akan dihapus
            let index = tempSpp.indexOf(item)
            // hapus data
            tempSpp.splice(index, 1)
            this.setState({ spp: tempSpp })
        }
    }

    searching = event => {
        if (event.keyCode === 13) {
            // 13 adalah kode untuk tombol enter
            let keyword = this.state.keyword.toLowerCase()
            let tempSpp = this.state.spp
            let result = tempSpp.filter(item => {
                return item.judul.toLowerCase().includes(keyword) ||
                    item.angkatan.toLowerCase().includes(keyword) ||
                    item.tahun.toLowerCase().includes(keyword)
            })
            this.setState({ filterspp: result })
        }
    }

    Close = () =>{
        $("#modal_spp").hide()
    }


    render() {
        return (
            <div className="spp me-5">
                <div className="dashboard-spp ms-5"><br/><br/>
                    <h5 className="card-title display-3 fw-bolder mb-0">TUITON LIST</h5>
                    <p className="card-text lead fs-2 mb-5">mFinT</p>
                    
                    <div className='content'>
                        <input type="text" className="form-control my-2" placeholder="Search Tuition" value={this.state.keyword} onChange={ev => this.setState({ keyword: ev.target.value })} onKeyUp={ev => this.searching(ev)} /><br/>
                        <div className="row">
                            {this.state.filterspp.map((item, index) => (
                                <div className="col-lg-4 col-sm-12 p-2">
                                    <div className="card">
                                        <div className="card-body row">
                                            {/* menampilkan Gambar / cover */}
                                            <div className="col-5">
                                                <img src={item.cover} className="img" height="200" width="190" />
                                            </div>
                                            {/* menampilkan deskripsi */}
                                            <div className="col-7">
                                                <h5><b>{item.judul}</b>
                                                </h5>
                                                <h6 className="text-dark">
                                                    Force: {item.angkatan}
                                                </h6>
                                                <h6 className="text-dark">
                                                    Year: {item.tahun}
                                                </h6>
                                                <h6 className="text-danger">
                                                    Nominal: Rp {item.harga}
                                                </h6>
                                                <button className="btn btn-sm btn-dark m1 me-2" id="light" onClick={() => this.Edit(item)} data-toggle="modal" data-target="#modal_spp"><i className="fa fa-pencil"></i></button>
                                                <button className="btn btn-sm btn-dark m1" id="dark" onClick={() => this.Drop(index)}><i className="fa fa-trash"></i></button>

                                            </div>

                                        </div>
                                    </div>
                                </div>
                            ))}

                        </div>
                        
                        <button type="button" id="light" data-toggle="modal" data-target="#modal_spp" className="btn btn-dark mb-2 mt-2" onClick={() => this.Add()}>Add Tuition</button>
                        
                    </div>
                    <br></br>

                    <div id="modal_spp" className="modal" role="dialog">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h4 class="modal-title">Tuition Data</h4>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => this.Close()}></button>
                                </div>
                                <div class="modal-body">
                                    <form onSubmit={this.Save}>
                                        Tuition Name
                                        <input type="text" className="form-control mb-2" value={this.state.judul} onChange={ev => this.setState({ judul: ev.target.value })} required />
                                        Force
                                        <input type="text" className="form-control mb-2" value={this.state.angkatan} onChange={ev => this.setState({ angkatan: ev.target.value })} required />
                                        Year
                                        <input type="number" className="form-control mb-2" value={this.state.tahun} onChange={ev => this.setState({ tahun: ev.target.value })} required />
                                        Nominal
                                        <input type="number" className="form-control mb-2" value={this.state.harga} onChange={ev => this.setState({ harga: ev.target.value })} required />
                                        Image
                                        <input type="url" className="form-control mb-2" value={this.state.cover} onChange={ev => this.setState({ cover: ev.target.value })} required />
                                        <br></br>
                                        <button className="btn btn-dark btn-block" id="light" type="submit">Save</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}

export default Tuition;