const scrapeIt = require("scrape-it");
var jsonfile = require("jsonfile");

var page_number = 1;
var x = {
    articles: []
};
var url;
var file = 'data_1.json'

function sc(page_number) {
    url = "http://ashxatanqner.com/?ad_cat=%D5%A1%D5%BC%D5%A1%D5%BB%D5%A1%D6%80%D5%AF%D5%B8%D6%82%D5%B4-%D5%A5%D5%B4&paged=" + page_number;
    scrapeIt(url, {

        articles: {
            listItem: ".post-block",
            data: {
                work: {
                    selector: "div.post-right.full > h3 > a"

                },
                cost: {
                    selector: "div.post-right.full > div.tags.price-wrap > span",
                    convert: function(x) {
                        var y = x.split(" ")[0]
                        var z = y.replace(/,/i, '');
                        var a = parseInt(z)
                        return a;
                    }
                },
                name: "div.post-right.full > p.post-meta > span.dashicons-before.owner",
                data: "div.post-right.full > p.post-meta > span.dashicons-before.clock > span",
                informations: "div.post-right.full > p.post-desc",
                views: "div.post-right.full > p.stats",
                image_url: {
                    selector: "div.post-left > a > img",
                    attr: "src"
                },
                url: {
                    selector: "div.post-left > a",
                    attr: "href"
                },
                date: {
                    selector: "div.post-left > a > img",
                    attr: "src",
                    convert: function(x){
                        var re = /uploads\/(\d*\/\d*)\//i;
                        if (re.test(x)) {
                          var found = x.match(re);
                          var c = found[1].split("/")[0]
                          var u = found[1].split("/")[1]
                          var k = parseInt(c)
                          var m = parseInt(u)
                          var arr=[];
                          arr.push(k,m      )
                          return arr;
                        } else {
                          return "";
                        }
                    }
                }
                
            }

        }




    }, (err, page) => {
        x.articles.push(...page.articles);
        console.log('x: ' + x.articles.length);
        console.log('url: ' + url);
        if (page_number == 15) { 
            jsonfile.writeFile(file, x, {
                spaces: 2
            }, function(err) {
                console.error(err)
            });
        } else {
            setTimeout(
                () => {
                    page_number++;
                    console.log(page_number);
                    sc(page_number);
                }, 3000);
        }


    });
    
}
sc(page_number);