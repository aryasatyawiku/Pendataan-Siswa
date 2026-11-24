function login() {
    const user = document.getElementById("username").value;
    const pass = document.getElementById("password").value;

    if (user === "Aryasatya Wijayakusuma" && pass === "12345") {
        localStorage.setItem("isLoggedIn", "true");
        window.location.href = "dashboard.html";
    } else {
        alert("Username atau Password salah!");
    }
}

function logout() {
    localStorage.removeItem("isLoggedIn");
    window.location.href = "login.html";
}

if (!localStorage.getItem("isLoggedIn") && !window.location.href.includes("login.html")) {
    window.location.href = "login.html";
}

function simpanData() {
    const nama = document.getElementById("nama").value;
    const umur = document.getElementById("umur").value;
    const kelas = document.getElementById("kelas").value;
    const fotoInput = document.getElementById("foto");

    if (!nama || !umur || !kelas || fotoInput.files.length === 0) {
        alert("Mohon lengkapi semua data terlebih dahulu!");
        return;
    }

    const reader = new FileReader();
    reader.onload = function(e) {
        const fotoBase64 = e.target.result;
        const dataBaru = { nama, umur, kelas, foto: fotoBase64 };

        let listSiswa = JSON.parse(localStorage.getItem("dataSiswa")) || [];
        listSiswa.push(dataBaru);
        localStorage.setItem("dataSiswa", JSON.stringify(listSiswa));

        alert("Data berhasil disimpan!");
        window.location.href = "data.html";
    };
    reader.readAsDataURL(fotoInput.files[0]);
}

function tampilkanData() {
    const tabel = document.getElementById("tabelData");
    if (!tabel) return; 

    const listSiswa = JSON.parse(localStorage.getItem("dataSiswa")) || [];
    tabel.innerHTML = "";

    listSiswa.forEach((siswa, index) => {
        tabel.innerHTML += `
            <tr>
                <td><img src="${siswa.foto}" alt="foto"></td>
                <td>${siswa.nama}</td>
                <td>${siswa.kelas}</td>
                <td>${siswa.umur} Thn</td>
                <td>
                    <div class="action-btns">
                        <button class="btn-sm btn-edit" onclick="bukaEdit(${index})">Edit</button>
                        <button class="btn-sm btn-delete" onclick="hapusData(${index})">Hapus</button>
                        <button class="btn-sm btn-print" onclick="window.print()">Cetak</button>
                    </div>
                </td>
            </tr>
        `;
    });
}

function hapusData(index) {
    if (confirm("Anda yakin ingin menghapus data ini?")) {
        let listSiswa = JSON.parse(localStorage.getItem("dataSiswa"));
        listSiswa.splice(index, 1);
        localStorage.setItem("dataSiswa", JSON.stringify(listSiswa));
        tampilkanData();
    }
}

function bukaEdit(index) {
    const listSiswa = JSON.parse(localStorage.getItem("dataSiswa"));
    const siswa = listSiswa[index];

    document.getElementById("halamanData").style.display = "none";
    document.getElementById("halamanEdit").style.display = "block";

    document.getElementById("indexEdit").value = index;
    document.getElementById("editNama").value = siswa.nama;
    document.getElementById("editUmur").value = siswa.umur;
    document.getElementById("editKelas").value = siswa.kelas;
}

function simpanEdit() {
    const index = document.getElementById("indexEdit").value;
    let listSiswa = JSON.parse(localStorage.getItem("dataSiswa"));
    
    const fotoInput = document.getElementById("editFoto");
    
    const updateData = () => {
        listSiswa[index].nama = document.getElementById("editNama").value;
        listSiswa[index].umur = document.getElementById("editUmur").value;
        listSiswa[index].kelas = document.getElementById("editKelas").value;
        
        localStorage.setItem("dataSiswa", JSON.stringify(listSiswa));
        alert("Data diperbarui!");
        location.reload();
    };

    if (fotoInput.files.length > 0) {
        const reader = new FileReader();
        reader.onload = function(e) {
            listSiswa[index].foto = e.target.result;
            updateData();
        };
        reader.readAsDataURL(fotoInput.files[0]);
    } else {
        updateData();
    }
}

function batalEdit() {
    location.reload();
}

window.onload = tampilkanData;