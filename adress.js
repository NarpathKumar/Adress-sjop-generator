console.clear();
var dataTable = $('#data-table');
var add = $('#add-button');
var form = $('form');
var displayData = $('#display-data')
var prevRow;

var dataFromBackened ;

$.get("https://5f01721007605200169e6fd4.mockapi.io/kuchbhidede",function(e){
    dataFromBackened = e;
    for(var i=0; i<dataFromBackened.length; i++){
    dataTable.append(createRow(dataFromBackened[i]));
    }
})

$("#search").on({
    input: function(e){
        dataTable.get(0).innerHTML = ""
        var input = e.target.value.toLowerCase()
        for(var i=0; i<dataFromBackened.length; i++){
            var name = dataFromBackened[i].name.toLowerCase();
            if(name.includes(input)){
               dataTable.append(createRow(dataFromBackened[i]))
            }
        }
    }
})
add.click(function(){
    if(add.text() === "Add ?."){
        add.text("Remove form")
        form.css({"display":"block"})
    }
    else{
        add.text("Add ?.")
        form.css({"display":"none"})
        
    }
})
form.on({
    submit :function(e){
        e.preventDefault();
        var obj = {
            'name' : e.target.name.value,
            'phoneNo' : e.target.phoneNo.value,
            'phoneNo2' : e.target.pNo2.value,
            'address' : $('#input-add').val(),
            'gstNo' : e.target.gst.value,
            'lorryName' : e.target.lorry.value
        }
        $.post("https://5f01721007605200169e6fd4.mockapi.io/kuchbhidede",obj,function(e){
            dataTable.append(createRow(e));
            form.get(0).reset();
            window.location.reload();
            })
    }
})

function createRow(data){
    var row = $('<tr>').addClass('data-row');
    row.get(0).id = data.id
    row.append($('<td>').addClass('row-data').append($('<p>').addClass('overflow').text(data.name)));
    row.append($('<td>').addClass('row-data').append($('<p>').addClass('overflow').text(data.phoneNo)));
    row.append($('<td>').addClass('row-data').append($('<p>').addClass('overflow').text(data.gstNo)));
    
    row.click(function(){
        for(var i=0; i<dataFromBackened.length; i++){
            if(row.get(0).id == dataFromBackened[i].id){
                displayData.css({"display":"block"})
                $('#check-name').text(dataFromBackened[i].name);
                $('#check-p1').text(dataFromBackened[i].ohoneNo)
                $('#check-p2').text(dataFromBackened[i].phoneNo2)
                $('#check-gst').text(dataFromBackened[i].gstNo)
                $('#check-lorry').text(dataFromBackened[i].lorryName)
                $('#display-add').val(dataFromBackened[i].address);
            }
        }
    })
    return row;
}

$('#close-button').click(function(){
    displayData.css({"display":"none"})
})