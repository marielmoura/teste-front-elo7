document.addEventListener("DOMContentLoaded", function() {
   

    fetch('http://www.mocky.io/v2/5d6fb6b1310000f89166087b')
    .then(res=>res.json()).then(res=>res.vagas)
    .then(vagas=>vagas.filter(vaga=>vaga.ativa==true))
    .then(vagas=>populateList(vagas))
    .catch(err => console.log(err))
 
});
function populateList(vagas){
    let positionsList = document.getElementById("positions")

    vagas.forEach(vaga => {
        console.log(vaga)
        let li = document.createElement("li")
        let a = document.createElement("a")
        let location = document.createElement("span")
        a.textContent = vaga.cargo
        a.href = "#"
        location.textContent = vaga.localizacao?vaga.localizacao.bairro + ' - ' + vaga.localizacao.cidade:"Remoto"
        a.appendChild(location)
        li.appendChild(a)

        positionsList.appendChild(li)
        
    });

}
 