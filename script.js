$(document).ready(function(){
	
	var score = [];
    score[1] = 0;
    score[2] = 0;
    score[3] = 0;
 
  function init(){
    $('.table-cell').each(function(){
      var chooseColor = Math.floor(Math.random() * 3) + 1;
      $(this).attr('data-color', chooseColor);
    })
  }
  
  init();
  
  function calculateChain(startX, startY){
    var thisColor = $('.table-cell[data-x='+startX+'][data-y='+startY+']').attr('data-color');
    $('.table-cell[data-x='+startX+'][data-y='+startY+']').addClass('checked');
    var chain = [[startX, startY]];
    
    var i = 0;
    while(i < chain.length){
      
      var x = chain[i][0];
      var y = chain[i][1];
      
      if($('.table-cell[data-x='+x+'][data-y='+parseInt(y-1)+']:not(.checked)').attr('data-color') == thisColor){
        chain.push([x, y-1]);
      }
      if($('.table-cell[data-x='+parseInt(x+1)+'][data-y='+y+']:not(.checked)').attr('data-color') == thisColor){
        chain.push([x+1, y]);
      }
      if($('.table-cell[data-x='+x+'][data-y='+parseInt(y+1)+']:not(.checked)').attr('data-color') == thisColor){
        chain.push([x, y+1]);
      }
      if($('.table-cell[data-x='+parseInt(x-1)+'][data-y='+y+']:not(.checked)').attr('data-color') == thisColor){
        chain.push([x-1, y]);
      }
      
      $('.table-cell[data-x='+x+'][data-y='+parseInt(y-1)+']').addClass('checked');
      $('.table-cell[data-x='+parseInt(x+1)+'][data-y='+y+']').addClass('checked');
      $('.table-cell[data-x='+x+'][data-y='+parseInt(y+1)+']').addClass('checked');
      $('.table-cell[data-x='+parseInt(x-1)+'][data-y='+y+']').addClass('checked');
      
      i++;
    }  
    $('.table-cell').removeClass('checked');
    return chain;
  }
   
  function destroyBlocks(destroy){
    destroy.forEach(function(e){
      var x = e[0];
      var y = e[1];
      $('.table-cell[data-x='+x+'][data-y='+y+']').addClass('empty')
      $('.table-cell[data-x='+x+']:not(.empty)').each(function(){
        if($(this).attr('data-y') < y){
          $(this).addClass('to-fall')
        }
      })
      $('.table-cell.empty').removeClass('to-fall')
    })
  }
  
  function updateBlockPositions(){
    $($('.table-cell.to-fall').get().reverse()).each(function(){
      
      var x = $(this).data('x');
      var y = $(this).data('y');
      
      var distanceToFall = 0;
      $('.table-cell[data-x='+x+'].empty').each(function(){
        if($(this).data('y') > y){
          distanceToFall++;
        }
      })

      var newY = y + distanceToFall;
      $('.table-cell[data-x='+x+'][data-y='+newY+']').removeClass('empty').attr('data-color', $(this).attr('data-color'))
      $(this).addClass('empty').attr('data-color', -1).removeClass('to-fall')
    })			
  }
  
  function spawnNewBlocks(){
    $('.table-cell.empty').each(function(){
      var chooseColor = Math.floor(Math.random() * 3) + 1;
      $(this).attr('data-color', chooseColor).removeClass('empty');
    })
  }
		
		
  function scorePoints(color, numPoints){
    var curPoints = parseInt($('.score-'+color).text());
    var newPoints = curPoints + numPoints;
    $('.score-'+color).text(newPoints)  
		if(newPoints > 100)
		{
			$('#timer').html("<p1>GAME OVER!</p1>");
			alert("You went over 100! Game Over!\nTry Again?");
			window.location.reload();
		}
		var blue = $('#b').text();
		var purple = $('#p').text();
		var green = $('#g').text();		
		if(blue == 100 && purple == 100 && green == 100)
		{
			$('#timer').html("<p1>GAME OVER!</p1>");
			alert("CONGRATS! YOU WIN! \nPlay Again?");
			window.location.reload();
		}
		/*console.log(blue);*/
  }

  $('.table-cell').click(function(){
    var thisChain = calculateChain($(this).data('x'),$(this).data('y'));
		
			
		
    scorePoints($(this).attr('data-color'), thisChain.length);
    destroyBlocks(thisChain);
    updateBlockPositions();
    setTimeout(function(){
      spawnNewBlocks();
    },500);    
  })
  
var counter = 30;
var interval = setInterval(function() {
    counter--;
    if (counter < 0) {
		clearInterval(interval);
		$('#timer').html("<p1>GAME OVER!</p1>");		
		alert("Time's up! Game Over!\nTry Again?");	

		window.location.reload();
    }else{
    	$('#time').text(counter);
    }
}, 1000);
  
})



