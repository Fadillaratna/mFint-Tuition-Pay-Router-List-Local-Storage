import React from 'react';
import $ from "jquery";

class Class extends React.Component {
    constructor() {
        super();
        this.state = {
            kelas: [
                { jurusan: "TKJ", nama: "XII TKJ 1", angkatan: "28" },
                { jurusan: "RPL", nama: "XI RPL 1", angkatan: "29" },
                { jurusan: "TKJ", nama: "X TKJ 1", angkatan: "30" },
            ],
            jurusan: "",
            nama: "",
            angkatan: "",
            action: ""
        }
        this.state.filterkelas = this.state.kelas
    }

    bind = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    SaveKelas = (event) => {
        event.preventDefault();
        let temp = this.state.kelas;

        if (this.state.action === "insert") {
            temp.push({
                jurusan: this.state.jurusan,
                nama: this.state.nama,
                angkatan: this.state.angkatan
            });
        } else if (this.state.action === "update") {
            let index = temp.findIndex(item => item.jurusan === this.state.jurusan);
            temp[index].nama = this.state.nama;
            temp[index].jurusan = this.state.jurusan;
            temp[index].angkatan = this.state.angkatan;
        }

        this.setState({ kelas: temp });
        $("#modal").hide()
    }

    Add = () => {
        $("#modal").show()
        this.setState({
            jurusan: "",
            nama: "",
            angkatan: "",
            action: "insert"
        });
    }

    Edit = (item) => {
        $("#modal").show()
        this.setState({
            jurusan: item.jurusan,
            nama: item.nama,
            angkatan: item.angkatan,
            action: "update"
        });
    }

    Drop = (index) => {
        // beri konfirmasi untuk menghapus data
        if (window.confirm("Apakah anda yakin ingin menghapus data kelas ini?")) {
            // menghapus data
            let temp = this.state.kelas;
            // hapus data
            temp.splice(index, 1);
            this.setState({ kelas: temp });
        }
    }

    searching = event => {
        if (event.keyCode === 13) {
            // 13 adalah kode untuk tombol enter
            let keyword = this.state.keyword.toLowerCase()
            let tempKelas = this.state.kelas
            let result = tempKelas.filter(item => {
                return item.jurusan.toLowerCase().includes(keyword) ||
                    item.nama.toLowerCase().includes(keyword) ||
                    item.angkatan.toLowerCase().includes(keyword)
            })
            this.setState({ filterkelas: result })
        }
    }

    Close = () =>{
        $("#modal").hide()
    }

    render() {
        return (
            <div className="siswa me-5">
                <div className="dashboard ms-5"><br/><br/>
                    <h5 className="card-title display-3 fw-bolder mb-0">CLASS LIST</h5>
                    <p className="card-text lead fs-2 mb-3">mFinT.</p>
                    <button type="button" className="btn btn-dark mb-3" id="light" onClick={this.Add} data-toggle="modal" data-target="#modal">Add Class</button>
                    <input type="text" className="form-control my-2" placeholder="Search Class" value={this.state.keyword} onChange={ev => this.setState({ keyword: ev.target.value })} onKeyUp={ev => this.searching(ev)} />
                    <br></br>


                    <ul className="list-group">
                        {this.state.filterkelas.map((item, index) => {
                            return (
                                <li className="list-group-item flush" key={index}>
                                    <h5><b>{item.nama}</b></h5>
                                    <h6>Major: {item.jurusan}</h6>
                                    <h6>Force: {item.angkatan}</h6>
                                    <button className="btn btn-sm btn-dark m2 me-2" id="light" onClick={() => this.Edit(item)} data-toggle="modal" data-target="#modal">Edit</button>
                                    <button className="btn btn-sm btn-dark m1" id="dark" onClick={() => this.Drop(index)}> Delete </button>
                                </li>
                            );
                        })}
                    </ul>

                   <br/>

                    <div className="modal" id="modal">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h4 class="modal-title"><b>Class Data</b></h4>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => this.Close()}></button>
                                </div>
                                <div class="modal-body">
                                    <form onSubmit={this.SaveKelas}>
                                        Class Name
                                        <input type="text" name="nama" className="form-control mb-2" onChange={this.bind} value={this.state.nama} required />
                                        Major
                                        <input type="text" name="jurusan" className="form-control mb-2" onChange={this.bind} value={this.state.jurusan} required />
                                        Force
                                        <input type="text" name="angkatan" className="form-control mb-2" onChange={this.bind} value={this.state.angkatan} required />
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

export default Class;