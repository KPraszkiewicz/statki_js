const N = 10
const SUMASTATKOW = 20

var statkiGracza = [1, 1, 1, 1, 2, 2, 2, 3, 3, 4]
var listaStatkow = []
var wybrany = statkiGracza.length - 1
var pion = false
var czyMozna = true
var pole = []
var poleGracza = []
var polePom = []
var trafieniaGracza = 0
var trafieniaBota = 0
    //var rozpoczeto = false

function usunKlase(el, klasa) {
    if (el.className != "")
        if (el.classList.contains(klasa))
            el.classList.remove(klasa)
}

function generujPole() {
    let pole = []
    var tab0 = []
    for (let i = 0; i < N + 2; i++) {
        for (let i = 0; i < N + 2; i++) tab0.push(0)
        pole[i] = tab0
        tab0 = []
    }
    return pole
}

function wstawStatek(_pole, x, y, dx, dy) {
    for (let i = -1; i <= dx; i++)
        for (let j = -1; j <= dy; j++) {
            if (i >= 0 && j >= 0 && i < dx && j < dy)
                _pole[x + i][y + j] = 2
            else
                _pole[x + i][y + j] = 1
        }
}

function zdejmijStatek(_pole, x, y, dx, dy) {
    for (let i = 0; i < dx; i++)
        for (let j = 0; j < dy; j++)
            _pole[x + i][y + j] = 0

    for (let i = -1; i <= dx; i++)
        for (let j = -1; j <= dy; j++) {
            if (x + i == 0 || x + i == N + 1 || y + j == 0 || y + j == N + 1)
                continue
            if (i == -1)
                if (_pole[x + i - 1][y + j - 1] == 2 ||
                    _pole[x + i - 1][y + j] == 2 ||
                    _pole[x + i - 1][y + j + 1] == 2)
                    continue
            if (i == dx)
                if (_pole[x + i + 1][y + j - 1] == 2 ||
                    _pole[x + i + 1][y + j] == 2 ||
                    _pole[x + i + 1][y + j + 1] == 2)
                    continue
            if (j == -1)
                if (_pole[x + i - 1][y + j - 1] == 2 ||
                    _pole[x + i][y + j - 1] == 2 ||
                    _pole[x + i + 1][y + j - 1] == 2)
                    continue
            if (j == dy)
                if (_pole[x + i - 1][y + j + 1] == 2 ||
                    _pole[x + i][y + j + 1] == 2 ||
                    _pole[x + i + 1][y + j + 1] == 2)
                    continue
            _pole[x + i][y + j] = 0
        }
    console.log(x, y)
    console.table(_pole)
}

function losujMiejsceStatku(pole, statki) {
    var x
    var y
    var dx // delta x <+1>
    var dy
    var kier
    var stat
    var test
    var statki = [1, 1, 1, 1, 2, 2, 2, 3, 3, 4]

    while (statki.length > 0) {
        stat = statki.pop()
        do {
            kier = Math.random()
            test = false
            if (kier > 0.5) { //pion
                x = Math.floor(1 + Math.random() * N)
                y = Math.floor(1 + Math.random() * (N - stat + 1))
                dy = stat
                dx = 1
            } else { // poziom
                y = Math.floor(1 + Math.random() * N)
                x = Math.floor(1 + Math.random() * (N - stat + 1))
                dx = stat
                dy = 1
            }
            for (let i = 0; i < stat; i++)
                if (kier > 0.5) { //pion
                    if (pole[x][y + i] != 0)
                        test = true
                } else // poziom
            if (pole[x + i][y] != 0)
                test = true
        } while (test)
        wstawStatek(pole, x, y, dx, dy)
    }
}

function rysujRozwiazanie(pole) {
    var morze = document.getElementById("morze")
    for (let i = 1; i <= N; i++)
        for (let j = 1; j <= N; j++) {
            var el = document.createElement("div")
            el.className = "pole"
            if (pole[i][j] == 2)
                el.classList.add("statek")
            morze.appendChild(el)
        }
}

function klik1(x, y) {
    return function() {
        if (wybrany >= 0 && czyMozna) {
            let poz = {
                x: N,
                y: N
            }
            for (let ii = 1; ii <= N; ii++)
                for (let jj = 1; jj <= N; jj++)
                    if (poleGracza[ii][jj].classList.contains("poleZaz")) {
                        poleGracza[ii][jj].classList.add("poleZaj")
                        if (poz.x > ii)
                            poz.x = ii
                        if (poz.y > jj)
                            poz.y = jj
                    }
            if (poz.x == N && poz.y == N && statkiGracza[wybrany] > 1) {
                alert("nie świruj!")
            } else {
                if (pion)
                    wstawStatek(polePom, poz.x, poz.y, statkiGracza[wybrany], 1)
                else
                    wstawStatek(polePom, poz.x, poz.y, 1, statkiGracza[wybrany])

                listaStatkow[wybrany].classList.add("postawiony")
                wybrany = -1
            }
        } else if (wybrany == -1) {
            if (polePom[x][y] == 2) {
                usunKlase(poleGracza[x][y], "poleZaj")
                let poz = {
                    x: x,
                    y: y
                }
                let dl = {
                    x: 1,
                    y: 1
                };
                let k = -1;
                while (polePom[x + k][y] == 2) {
                    usunKlase(poleGracza[x + k][y], "poleZaj")
                    k--;
                    dl.x++;
                    poz.x--;
                }
                k = -1
                while (polePom[x][y + k] == 2) {
                    usunKlase(poleGracza[x][y + k], "poleZaj")
                    k--;
                    dl.y++;
                    poz.y--;
                }
                k = 1
                while (polePom[x + k][y] == 2) {
                    usunKlase(poleGracza[x + k][y], "poleZaj")
                    k++;
                    dl.x++;
                }
                k = 1
                while (polePom[x][y + k] == 2) {
                    usunKlase(poleGracza[x][y + k], "poleZaj")
                    k++;
                    dl.y++;
                }
                zdejmijStatek(polePom, poz.x, poz.y, dl.x, dl.y)
                var tmp = dl.x
                if (tmp < dl.y)
                    tmp = dl.y

                var wsk = statkiGracza.indexOf(tmp)
                for (let ll = tmp; ll < 5; ll++) {
                    if (listaStatkow[wsk].classList.contains("postawiony")) {
                        listaStatkow[wsk].classList.remove("postawiony")
                        wybrany = wsk
                        break
                    } else
                        wsk++
                }
            }
        }
        rozpoczecie()
    }
}

function najechanie1(x, y) {
    return function() {
        if (wybrany >= 0) {
            czyMozna = true;
            this.classList.add("poleZaz")
                //console.log(statkiGracza[wybrany])
            let tmpS;
            let tmpL;
            for (let k = 0; k < statkiGracza[wybrany]; k++) {
                if (pion)
                    if (x + k > N) {
                        tmpS = poleGracza[N - k][y]
                        tmpL = polePom[N - k][y]
                    } else {
                        tmpS = poleGracza[x + k][y]
                        tmpL = polePom[x + k][y]
                    }
                else
                if (y + k > N) {
                    tmpS = poleGracza[x][N - k]
                    tmpL = polePom[x][N - k]
                } else {
                    tmpS = poleGracza[x][y + k]
                    tmpL = polePom[x][y + k]
                }

                if ( /*tmpS.classList.contains("poleZaj")||*/ tmpL > 0) {
                    tmpS.classList.add("poleNie")
                    czyMozna = false;
                } else
                    tmpS.classList.add("poleZaz")
                    //console.log(czyMozna)
            }
        }
    }
}

function wyjechanie1() {
    return function() {
        for (let ii = 1; ii <= N; ii++)
            for (let jj = 1; jj <= N; jj++) {
                poleGracza[ii][jj].classList.remove("poleZaz")
                poleGracza[ii][jj].classList.remove("poleNie")
            }
    }
}

function zatop(_pole, x, y) {

}

function strzalGracza(e) {
    if (!czyMozna) {
        alert("poczekaj")
        return 0;
    }
    console.log(e.target)
    el = e.target;
    poz = {
        x: el.className.split("_")[1],
        y: el.className.split("_")[2]
    }
    console.log(poz)
    if (pole[poz.x][poz.y] == 2) {
        el.classList.add("trafiony")
        trafieniaGracza++
        if (trafieniaGracza == SUMASTATKOW)
            alert("Wygrał Gracz!")
        czyMozna = false
    } else {
        el.classList.add("pudlo")
        czyMozna = false
        if (trafieniaGracza >= SUMASTATKOW)
            alert("Już wygrałeś. Po co dalej strzelasz?")
    }

    // if (trafieniaGracza > SUMASTATKOW)
    //     console.log("Coś jest nie tak.")

    el.onclick = null
    setTimeout(() => {
        strzalBota();
    }, 1000)
}

function strzalBota() {
    let x = Math.floor((Math.random() * 10) + 1);
    let y = Math.floor((Math.random() * 10) + 1);
    while (poleGracza[x][y].classList.contains("pudlo") || poleGracza[x][y].classList.contains("trafienie")) {
        x = Math.floor((Math.random() * 10) + 1);
        y = Math.floor((Math.random() * 10) + 1);
    }
    if (polePom[x][y] == 2) {
        poleGracza[x][y].classList.add("trafiony")
        trafieniaBota++
        if (trafieniaBota == SUMASTATKOW)
            alert("Wygrał Komputer!")
    } else {
        poleGracza[x][y].classList.add("pudlo")
    }
    czyMozna = true
}

function rysujPustePole() {
    polePom = generujPole()
    poleGracza = generujPole()
    var ocean = document.getElementById("ocean")
    ocean.oncontextmenu = function(e) {
        pion = !pion
        e.target.onmouseout()
        e.target.onmouseover()
        e.preventDefault()
    }
    for (let i = 1; i <= N; i++) {
        for (let j = 1; j <= N; j++) {
            var el = document.createElement("div")
            el.className = "pole_" + i + "_" + j
            el.onclick = klik1(i, j);
            el.onmouseover = najechanie1(i, j)
            el.onmouseout = wyjechanie1()
            ocean.appendChild(el)
            poleGracza[i][j] = el;
        }
    }
    //console.log(poleGracza)
}

function rysujPustePoleKom() {
    var morze = document.getElementById("morze")
    pole = generujPole();
    losujMiejsceStatku(pole, statki);
    for (let i = 1; i <= N; i++) {
        for (let j = 1; j <= N; j++) {
            var el = document.createElement("div")
            el.className = "pole_" + i + "_" + j
            morze.appendChild(el)
        }
    }
}

function listujStatki(_statki) {
    var panel = document.getElementById("statki")
    for (let i = _statki.length - 1; i >= 0; i--) {
        let okret = document.createElement("div")
        okret.className = "okret o" + _statki[i]
        for (let j = _statki[i]; j > 0; j--) {
            let el = document.createElement("div")
            el.onmouseover = function() {
                this.parentElement.classList.add("okretZaz")
            }
            el.onmouseout = function() {
                this.parentElement.classList.remove("okretZaz")
            }
            el.onclick = function() {
                if (wybrany >= 0)
                    listaStatkow[wybrany].classList.remove("okretWyb")
                if (wybrany != i) {
                    wybrany = i;
                    this.parentElement.classList.add("okretWyb")
                } else
                    wybrany = -1;
                console.log(wybrany)
            }
            okret.appendChild(el)
        }
        panel.appendChild(okret)
        listaStatkow.unshift(okret);
    }
    listaStatkow[wybrany].classList.add("okretWyb")
}

function rozpoczecie() {
    var przyciskStart = document.getElementById("start")
    var jeszczeNie = false
    listaStatkow.forEach(element => {
        if (!element.classList.contains("postawiony")) {
            jeszczeNie = true
            przyciskStart.style.display = "none"
        }
    });

    if (!jeszczeNie) {
        przyciskStart.style.display = "block"
        przyciskStart.onclick = function() {
            document.getElementById("ocean").oncontextmenu = null
            for (let i = 1; i <= N; i++)
                for (let j = 1; j <= N; j++) {
                    var el = poleGracza[i][j]
                    el.onclick = null;
                    el.onmouseover = null
                    el.onmouseout = null
                }

            let morze = document.getElementById("morze").children
                //console.log(morze)
            for (let i = 0; i < N * N; i++) {
                morze[i].onclick = strzalGracza;
            }
        }


    }
}

function main() {
    rysujPustePole();
    listujStatki(statkiGracza);
    rysujPustePoleKom()
}