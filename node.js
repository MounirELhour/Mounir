
var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');
var csv = require('fast-csv');
var ws = fs.createWriteStream('write3.csv')
var i=0;
var child1;
var res;
var res1;
js = new Array();
js1 = new Array();
var obj = {
   table: []
};

var regions = ['Alsace','Aquitaine','Auvergne','Basse Normandie','Bourgogne','Bretagne','Centre','Champagne-Ardenne','Corse','Franche-Comté','Haute Normandie','Ile-de-France','Languedoc-Roussillon','Limousin','Lorraine','Midi-Pyrénées','Nord-Pas-de-Calais','Pays de la Loire','Picardie','Poitou-Charentes','Provence-Alpes-Côte-d\'Azur','Rhône-Alpes','Guadeloupe','Martinique','Guyane','La Réunion','Mayotte'];
//var regions = ['Alsace','Aquitaine','Auvergne','Basse Normandie','Bourgogne'];
for(var j= 0; j < regions.length; j++){
  i=0;
while (i<2){

var url= 'https://www.indeed.fr/jobs?q=%28developpeur+or+informatique+or+web+or+data+or+java+or+php+or+python+or+R+or+ruby+or+css+or+html+or+xml+or+c%2B%2B+or+jee+or+j2e+or+symphony+or+laravel%29&l='+regions[j]+'&radius=100&limit=50&fromage=last&start='+i+'';
//console.log(url);

request(url, function (error, response, html) {
 if (!error && response.statusCode == 200) {
    var $ = cheerio.load(html);
    var s= ".jobsearch-SerpJobCard";
    //var js = new Array();
    $(".jobsearch-SerpJobCard").each(function(){

     //var  child = $(this).children("a").attr("title");
   // var child =$(".jobsearch-SerpJobCard").find(".title").text();
     child1 =$(this).find(".location").text();
    var child2 =$(this).children(".salarySnippet").text();
    var child3 =$(this).children(".title").text();
    res=child3.replace(/^\s+|\s+$/gm,'');
    res1=child2.replace(/^\s+|\s+$/gm,'');
  

//     var line =
 js.push(child1 + ';' + res1  + ';' + res + ';');
	 fs.appendFile('testWrite.txt', js[js.length-1]+"\n", "utf8", (err) => {
	  if (err) throw err;
	  //console.log('ok!');
	});
    });
   //console.log(js);

  }
});
  i=i+50;

}
console.log(j);
}
