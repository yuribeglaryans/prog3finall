google.charts.load('45', { packages: ['corechart', 'table',] });

google.charts.setOnLoadCallback(drawScatterChart);
google.charts.setOnLoadCallback(drawChart);
google.charts.setOnLoadCallback(drawTable);

function drawScatterChart() {
    $.ajax({
        url: "/articles",
        dataType: "json",
        success: function (jsonData) {
            var data = new google.visualization.DataTable();
            data.addColumn('date', 'date');
            data.addColumn('number', 'csot');


            for (var i = 0; i < jsonData.length; i++) {
                data.addRow([
                    new Date(jsonData[i].date),
                        jsonData[i].cost,

                ]);

            }

            var options = {
                legend: 'left',
                title: 'According to salary surveies',
                is3D: false,
                width: '100%',
                height: '100%',
                hAxis: { title: 'Month' },
                vAxis: { title: 'Salary', minValue: 0, maxValue: 2500},
            };
            //console.log(data.toJSON());
            // Instantiate and draw the chart.
            var chart = new google.visualization.ScatterChart(document.getElementById('chart_div0'));
            chart.draw(data, options);
        }
    });
};

function drawChart() {
    $.ajax({
        url: "/articles",
        dataType: "json",
        success: function (jsonData) {
            var data = new google.visualization.DataTable();
            data.addColumn('number', 'cost');
            for (var i = 0; i < jsonData.length; i++) {
                data.addRow([
                    jsonData[i].cost,
                ]);

            }

            var options = {
                title: 'Salary distributio',
                colors: ['orange'],
                legend: { position: 'none' },
                hAxis: { title: 'Work in salary' },
                vAxis: { title: 'Count of vacancy' },
                histogram: {
                    bucketSize: 100000,
                    maxNumBuckets: 1000000
                }
            };
            //console.log(data.toJSON());
            // Instantiate and draw the chart.
            var chart = new google.visualization.Histogram(document.getElementById('chart_div1'));
            chart.draw(data, options);
        }
    });
};


function drawTable() {
    $.ajax({
        url: "/articles",
        dataType: "json",
        success: function (jsonData) {
            var data = new google.visualization.DataTable();
            data.addColumn('string', 'Work');
            data.addColumn('number', 'Salary');
            data.addColumn('date', 'Date');

            for (var i = 0; i < jsonData.length; i++) {
                data.addRow([
                    jsonData[i].work,
                    jsonData[i].cost,
                    new Date(jsonData[i].date)
                ]);
            }

            var options = {
                allowHtml: true,
                showRowNumber: true,
                width: '100%',
                height: '100%'
            };

            var table = new google.visualization.Table(document.getElementById('barformat_div'));
            var formatter = new google.visualization.BarFormat({ width: 100 });
            formatter.format(data, 2); // Apply formatter to 3rd column
            table.draw(data, options);
        }
    });
}

$(window).resize(function () {
    drawScatterChart();
    drawChart();
    drawTable();
});
