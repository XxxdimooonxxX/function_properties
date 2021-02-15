//////////////////////////////////////////////////////////////////////////////////////////
//////////////// Autor: //////////////////////////////////////////////////////////////////
//                                                                                      //
//      -| function_properies |-                                                        //
//                                                                                      //
//      @XxxdimooonxxX 2021                                                             //
//////////////////////////////////////////////////////////////////////////////////////////
///////// Elements: //////////////////////////////////////////////////////////////////////
var el_input    = document.querySelector(".forms__input");
var bt_toCarry  = document.querySelector(".forms__button");
//////////////////////////////////////////////////////////////////////////////////////////
/////////// Global var.: /////////////////////////////////////////////////////////////////
var countZ = 0;//количество знаков
var pos = 0;//хранит позицию, чтобы после знака записать аргумент

var arrSlog;	//количество слогаемых
var arrCheck;	//что за слогаемое(число, аргумент, синус с арг-ом и тд)
var arrData;    //хранит значения, каждого "аргумента", чтобы потом получить значение f(x)
var arrFun		= new Array(5);//хранит названия для arrCheck, то есть названия "функций"
arrFun = ["x", "cos", "sin", "tng", "exp"];
var checkArrData = new Array(5);
checkArrData = [1, 3, 3, 3, 3];
//-----------------------------------
var iData = el_input.value;//name( input date == iData )
var equation = {

};
//-----------------------------------
function returnNum(date){
    var tras;
    for(i = 0; i < date.length; i++){
        if(date[i] == "("){
            for(j = i + 1; j < date.length; j++){
                if(date[j] != ")"){
                    (j == i + 1) ? tras = date[j] : tras += date[j];
                }
                return Number(tras);
            }
        }
    }
}
var fun = {
    "sin"(arg1){
        var num = returnNum(arg1);
        return (arg1[0] == "-") ? -1*Math.sin(num): Math.sin(num);
    }
};
//////////////////////////////////////////////////////////////////////////////////////////
/////// Programm: ////////////////////////////////////////////////////////////////////////

bt_toCarry.onclick = () => {
    iData = el_input.value;//string with equation
	//узнаем сколько слогаемых
	for(i = 0; i < iData.length; i++){
		if(iData[i] == "+" || iData[i] == "-"){
			countZ++;
		}
	}
	if(iData[0] != "+" || iData[0] != "-"){
		countZ++;
	}else{
		//ничего не делаем
	}
    //create array
	arrSlog		= new Array(countZ);//количество слогаемых
	arrCheck	= new Array(countZ);//что за слогаемое(число, аргумент, синус с арг-ом и тд)
    arrData     = new Array(countZ);//---
	
	//записываем слогаемые в arrSlog
	var posSC = 0;
	for(i = 0; i < iData.length; i++){
		if(iData[i] == "+" || iData[i] == "-" || i == iData.length - 1){
            if(i == iData.length - 1) i++;
			for(j = pos; j < i; j++){
				(j == pos) ? arrSlog[posSC] = iData[j] : arrSlog[posSC] += iData[j];
			}
			pos = i;
			posSC++;
		}
	}
	
	//заполняем arrCheck
	pos = 0;
	posSC = 0;
	for(i = 0; i < iData.length; i++){//обращение к каждому символу строки уравнения
		if(iData[i] == "+" || iData[i] == "-" || i == iData.length - 1){//находим аргумент, вот таким образом
			for(j = pos; j < i; j++){//обращение к каждому символу аргумента
				for(k = 0; k < arrFun.length; k++){//обращение к каждому элементу этого массива
					if(arrFun[k][0] == iData[j]){//если совпадает хотя бы первый символ,
                        var timeTrahs = checkArrData[k];
						for(l = 0; l < arrFun[k].length; l++){//то проверяем полностью
							if(arrFun[k][l] == iData[j + l]){
								checkArrData[k]--;
							}
						}
						if(checkArrData[k] == 0){//если совподение полное, то присваиваем
							arrCheck[posSC] = arrFun[k];
                            j += i;//если полностью совпало, выходим из проверки всех символов аргумента
                            checkArrData[k] = timeTrahs;//после проверки, возвращаем его
                            break;//после того, как нашли "функцию", выходим из цикла с проверкой всех элементов arrFun
						}
					}else if(k == arrFun.length - 1 && arrFun[k][0] != iData[j] && arrCheck[k] == undefined){//если нет "такого аргумента или функции", то просто присваиваем, как число
                        arrCheck[posSC] = "num";
                    }
				}
			}
			pos = i;
			posSC++;
		}
	}
    pos = 0;
    posSC = 0;

    //заполняем массив arrData
    for(i = 0; i < countZ; i++){
        arrData[i] = fun[arrCheck[i]](arrSlog[i]);
    }

    var time = 0;
    for(i = 0; i < countZ; i++){
        time += arrData[i];
    }
    alert(Math.sin(5));
}












































//////////////////////////////////////////////////////////////////
//NOT TOUCH!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
/*
bt_toCarry.onclick = () => {
    iData = el_input.value;//string with equation
    //alert(iData.length);
    var pos = 0;
    for(i = 0; i < iData.length; i++){
        if(iData[i] == "x"){
            //koof:
            for(j = pos; j < i; j++){
                if(j == pos) equation["i" + iData[i] + i] = iData[j];
                else equation["i" + iData[i] + i] += iData[j];
            }
            equation[iData[i] + i] = iData[i];

            //степень:
            if(iData[i + 1] == "^"){
                for(j = i + 2; j < iData.length; j++){
                    if(iData[j] != '+' && iData[j] != "-"){
                        if(j == i + 2) equation["^" + i] = iData[j];
                        else equation["^" + i] += iData[j];
                    }else{
                        break;
                    }
                }
            }else{
                equation["^" + i] = 1;
            }

            //alert(i);
            //для след "х" и т.д.
            pos += equation["ix" + i].length + equation["x" + i].length + equation["^" + i].length + 1;
        }
    }

    var asd = 0;
    equation.x3 = 2;
    equation.x9 = 2;
    //возводим в степень "х"
    for(key in equation){
        if(key[0] == "x"){
            /*for(i = 0; i < equation["^" + key[1]].length; i++){
                if(equation["^" + key[1]][i] == "+" || equation["^" + key[1]][i] == "-"){
                    equation["^" + key[1]] = equation["^" + key[1]].slice(0, i);
                }
            }*//*
            for(i = 0; i < Number(equation["^" + key[1]]) - 1; i++){
                equation[key] = equation[key] * 2;
            }
        }
    }
    //koof * x
    for(key in equation){
        if(key[0] == "^") continue;
        if(key[0] == "i" && key[1] == "x"){
            asd = Number(equation[key]) * equation[key[1] + key[2]];
        }
    }

    alert(asd);
}*/
