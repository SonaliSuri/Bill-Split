$(document).ready(function(){
   
    var ourRequest=new XMLHttpRequest();
    ourRequest.open('GET','https://reqres.in/api/users?page=2');
    ourRequest.onload=function(){
    //console.log(ourRequest.responseText);
    var ourUser=JSON.parse( ourRequest.responseText);
    console.log(ourUser);
    renderHTML(ourUser);
    }
    ourRequest.send();
	$('[data-toggle="tooltip"]').tooltip();
    var actions = $(".table-user td:last-child").html();
    var template=' <td><a class="add" title="Add" data-toggle="tooltip"><i class="material-icons">&#xE03B;</i></a><a class="edit" title="Edit" data-toggle="tooltip"><i class="material-icons">&#xE254;</i></a><a class="delete" title="Delete" data-toggle="tooltip"><i class="material-icons">&#xE872;</i></a></td>';
      

    // $( "#txtFirstName" ).autocomplete({
    //     source:["abc"]
    //   });
    $('[id*=addBill]').click(function () {
        $('#txtOccasion').val('');
        $('#txtAmount').val('');
        $('#BillId').val('');
        $('.table-billuser').find('td').each(function(){
            //     console.log($(this).find('.name').text())
            //     console.log($(this).find('.amount').text())
        $(this).parents("tr").remove();
		$(".add-new").removeAttr("disabled");

        }); 

      
    });
	// Append table with add row form on add new button click
    $(".add-newuser").click(function(){
		$(this).attr("disabled", "disabled");
		var index = $(".table-user tbody tr:last-child").index();
        var row = '<tr>' +
            '<td class="data"><input type="text" class="form-control" name="name" id="name"></td>' 
             +
			 template  +
        '</tr>';
    	$(".table-user").append(row);		
		$(".table-user tbody tr").eq(index + 1).find(".add, .edit").toggle();
        $('[data-toggle="tooltip"]').tooltip();
    });
   var globalcount=0;


//    $(".calculate-amount").click(function(){
//     var tbl = $('#table-billuser .amount').each(function(i) {        
//         x = $(this);
//         var itArr = [];
//         x.each(function() {
            
//            itArr.push('"' + $(this).text() + '"');
//         });
//         otArrnew.push('' + '{'+'"id":'+''+i+''+',"text"' + ': ' + itArr.join(',') + '}');
//      })
//      jsonnew += otArrnew.join(",") + ']'
//      var icountnew=JSON.parse(jsonnew)
//      var count=Object.keys(icountnew).length;
//         console.log($('#txtAmount').val()/count)

//    });




    $(".add-newbilluser").click(function(){
        $(this).attr("disabled", "disabled");
        var template=' <td><a class="add" title="Add" data-toggle="tooltip"><i class="material-icons">&#xE03B;</i></a><a class="edit" title="Edit" data-toggle="tooltip"><i class="material-icons">&#xE254;</i></a><a class="delete" title="Delete" data-toggle="tooltip"><i class="material-icons">&#xE872;</i></a></td>';
        
        var index = $(".table-billuser tbody tr:last-child").index();
      
        var row = '<tr class="userrow">' +            
            '<td><input type="text" class="form-control data name" id="name'+globalcount+1+'" name="name"></td>' +
            '<td><input type="text" class="form-control data amount" name="amount" id="amount"></td>'
             +
			 template  +
        '</tr>';
    	$(".table-billuser").append(row);		
		$(".table-billuser tbody tr").eq(index).find(".add, .edit").toggle();
        $('[data-toggle="tooltip"]').tooltip();


        var jsonnew = '[';
        var otArrnew = [];
        var tbl = $('#renderusers .data').each(function(i) {        
           x = $(this);
           var itArr = [];
           x.each(function() {
               
              itArr.push('"' + $(this).text() + '"');
           });
           otArrnew.push('' + '{'+'"id":'+''+i+''+',"text"' + ': ' + itArr.join(',') + '}');
        })
        jsonnew += otArrnew.join(",") + ']'
        var icountnew=JSON.parse(jsonnew)
        var count=Object.keys(icountnew).length;
        console.log(jsonnew);
        function format(item) { return item.name; };
        var str='';
        str='name'+globalcount+1;
        $('#'+str).select2({
            
            data:icountnew,
            dropdownParent: $("#modalRegisterForm")
        })
        globalcount=globalcount+1
     

    });
	// Add row on add button click
	$(document).on("click", ".add", function(){
		var empty = false;
		var input = $(this).parents("tr").find('input[type="text"]');
        input.each(function(){
			if(!$(this).val()){
				$(this).addClass("error");
				empty = true;
			} else{
                $(this).removeClass("error");
            }
		});
		$(this).parents("tr").find(".error").first().focus();
		if(!empty){
			input.each(function(){
                if(this.nextElementSibling!=null)
                {
                    $(this).parent('td').addClass(this.className)
                    $(this).parent('td').removeClass('form-control')
                    $(this).parent('td').removeClass('select2-hidden-accessible')
                    $(this).parent("td").html(this.nextElementSibling.innerText)
                    
                }
                
                $(this).parent('td').addClass(this.className)
                $(this).parent('td').removeClass('form-control')


                $(this).parent("td").html($(this).val());
               
			});			
			$(this).parents("tr").find(".add, .edit").toggle();
			$(".add-new").removeAttr("disabled");
		}		
    });
	// Edit row on edit button click
	$(document).on("click", ".edit", function(){		
        $(this).parents("tr").find("td:not(:last-child)").each(function(){
			$(this).html('<input type="text" class="form-control" value="' + $(this).text() + '">');
		});		
		$(this).parents("tr").find(".add, .edit").toggle();
		$(".add-new").attr("disabled", "disabled");
    });
	// Delete row on delete button click
	$(document).on("click", ".delete", function(){
        $(this).parents("tr").remove();
		$(".add-new").removeAttr("disabled");
    });
    $(document).on("click", ".editBill", function(){
        $(this).parents("tr").find('.occasion').each(function(){
            $('#txtOccasion').val($(this).text())
        })
        $(this).parents("tr").find('.amount').each(function(){
            $('#txtAmount').val($(this).text())
        })
        $(this).parents("tr").find('.id').each(function(){
            $('#BillId').val($(this).text())
        })
        $(this).parents("tr").find('.users').each(function(){
            renderBillUsers($(this).text())
            console.log($(this).text())
        })
        
    });
    function renderHTML(ourUser){
        var HTMLString="";
        console.log(ourUser.data);
        var usercontainer=document.getElementById("renderusers");
        var template=' <td><a class="add" title="Add" data-toggle="tooltip"><i class="material-icons">&#xE03B;</i></a><a class="edit" title="Edit" data-toggle="tooltip"><i class="material-icons">&#xE254;</i></a><a class="delete" title="Delete" data-toggle="tooltip"><i class="material-icons">&#xE872;</i></a></td>';
        for(i=0;i<ourUser.data.length;i++)
        {
            HTMLString+="<tr><td class='data'>"+ourUser.data[i].first_name+" "+ourUser.data[i].last_name+"</td>"+template+"</tr>";
        console.log(HTMLString);
        }
        console.log(HTMLString);
        usercontainer.insertAdjacentHTML('beforeend',HTMLString);
    }

    function renderBillUsers(ourBill){
        var HTMLString="";
        console.log(ourBill.data);
        var icount=JSON.parse(ourBill)
        var usercontainer=document.getElementById("renderbillusers");
        $('.table-billuser').find('td').each(function(){
            //     console.log($(this).find('.name').text())
            //     console.log($(this).find('.amount').text())
        $(this).parents("tr").remove();
		$(".add-new").removeAttr("disabled");

        });  
        
        var template=' <td><a class="add" title="Add" data-toggle="tooltip"><i class="material-icons">&#xE03B;</i></a><a class="edit" title="Edit" data-toggle="tooltip"><i class="material-icons">&#xE254;</i></a><a class="delete" title="Delete" data-toggle="tooltip"><i class="material-icons">&#xE872;</i></a></td>';
        for(i=0;i<Object.keys(icount).length;i++)
        {
            HTMLString+="<tr class='userrow'><td class='data'>"+icount[i][0]+"</td>"+
            "<td class='data'>"+icount[i][1]+"</td>"+
            
            template+"</tr>";
       
        }
       
        usercontainer.insertAdjacentHTML('beforeend',HTMLString);
    }



    $(function () {
        $('[id*=btnSave]').click(function () {
            var sum=0;
            var tbl = $('#table-billuser .amount').each(function(i) {        
                        x = $(this);
                        var itArr = [];
                        x.each(function() {
                            
                         sum=sum+ $(this).text() 
                        });
                       
                     })
                     
                     console.log($('#txtAmount').val())
                     console.log(sum)
                     console.log($('#txtAmount').val()==sum)
                        
            // if{
                
            // }
            // else
            {
            var BillDetail = {};
            debugger;
            BillDetail.BillId=$('[id*=BillId]').val();
            BillDetail.Occasion = $('[id*=txtOccasion]').val();
            BillDetail.Amount = $('[id*=txtAmount]').val(); 
            // var users={}
            // var arr1="["
            // $('.table-billuser').find('.userrow').each(function(){
            //     console.log($(this).find('.name').text())
            //     console.log($(this).find('.amount').text())

            // });    
            
            var json = '{';
            var otArr = [];
            var tbl2 = $('.table-billuser .userrow').each(function(i) {        
               x = $(this).children();
               var itArr = [];
               x.each(function() {
                   if($(this).hasClass('data'))
                  itArr.push('"' + $(this).text() + '"');
               });
               otArr.push('"' + i + '": [' + itArr.join(',') + ']');
            })
            json += otArr.join(",") + '}'
         
            console.log(json);
            BillDetail.Users=json;



            var datajson=   JSON.stringify(BillDetail) ;
            var template=' <td><a class="add" title="Add" data-toggle="tooltip"><i class="material-icons">&#xE03B;</i></a><a class="editBill" title="Edit" data-toggle="modal" data-target="#modalRegisterForm"><i class="material-icons">&#xE254;</i></a><a class="delete" title="Delete" data-toggle="tooltip"><i class="material-icons">&#xE872;</i></a></td>';
           var isupdate=0;
            $('.table-bill').find('.id').each(function(){
                // console.log($(this).text())
                // console.log(BillDetail.BillId)
                 console.log($(this).parents("tr"))
                //console.log($(this).text()===BillDetail.BillId)
                if($(this).text()===BillDetail.BillId)
                {
                    $(this).parents("tr").find(".occasion").text(BillDetail.Occasion)
                    $(this).parents("tr").find(".amount").text(BillDetail.Amount)
                    $(this).parents("tr").find(".users").text(BillDetail.Users)
                    isupdate=1;
                }
                
            });		
            console.log(datajson);
            if(isupdate===0)
            {
            var index = $(".table-bill tbody tr:last-child").index();
            var rowCount = $('.table-bill tr').length;
            var row = '<tr>' +
            '<td class="id">'+rowCount+'</td>' +
                '<td class="occasion">'+BillDetail.Occasion+'</td>' +
                '<td class="amount">'+BillDetail.Amount+'</td>'+
                '<td class="users" hidden>'+BillDetail.Users+'</td>'
                 +
                 template  +
            '</tr>';
            $(".table-bill").append(row);		
            $(".table-bill tbody tr").eq(index + 2).find(".add, .edit").toggle();
            $('[data-toggle="tooltip"]').tooltip();
            }
        }
        });
    });
});