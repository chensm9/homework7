function Init() {
  var img = new Image();
  img.src = 'panda.jpg';
  img.onload = function() {
    var TD = document.getElementsByTagName("td");
    for (var i = 0; i < TD.length; i++) {
      TD[i].width = img.width/4;
      TD[i].height = img.height/4;
      if (i != 15) {
        TD[i].style.backgroundImage = "url(" + img.src + ")";
        TD[i].style.backgroundPositionX = -(i%4)*img.width/4 + "px";
        TD[i].style.backgroundPositionY = -Math.floor(i/4)*img.height/4 + "px";
      }
      TD[i]["old_id"] = i;
      TD[i]["new_id"] = i;
    }
    TD[15].style.backgroundImage = "none";
  }
}

function ChangeToNone(t1, t2) {
  t2.style.backgroundImage = t1.style.backgroundImage;
  t2.style.backgroundPositionX = t1.style.backgroundPositionX;
  t2.style.backgroundPositionY = t1.style.backgroundPositionY;
  var temp = t1.new_id;
  t1.new_id = t2.new_id;
  t2.new_id = temp;
  t1.style.backgroundImage = "none";
}

//判断拼图是否有解
function Valid (nums) {
  var sum = 0;
  for (var i = 0; i < nums.length - 1; i++)
    for (var j = i+1; j < nums.length; j++)
      if (nums[i] > nums[j]) sum++;
  return sum%2 == 0;
}

function ramdomSet() {
  for (var i = 0; i < 15; i++) {
    if ($("td")[i].new_id == 15) {
      ChangeToNone($("td")[15], $("td")[i]);
      break;
    }
  }
  while (1) {
    for (var i = 0; i < 100; i++) {
      var num1 = Math.round(Math.random()*14);
      var num2 = Math.round(Math.random()*14);
      var X = $("td")[num1].style.backgroundPositionX;
      var Y = $("td")[num1].style.backgroundPositionY;
      $("td")[num1].style.backgroundPositionX = $("td")[num2].style.backgroundPositionX;
      $("td")[num1].style.backgroundPositionY = $("td")[num2].style.backgroundPositionY;
      $("td")[num2].style.backgroundPositionX = X;
      $("td")[num2].style.backgroundPositionY = Y;
      var id = $("td")[num1].new_id;
      $("td")[num1].new_id = $("td")[num2].new_id;
      $("td")[num2].new_id = id;
    }
    var nums = new Array(15);
    for (var i = 0; i < 15; i++)
      nums[i] = $("td")[i].new_id;
    if (Valid(nums)) break;
  }
}

function gameOver() {
  var TD = document.getElementsByTagName("td"), i;
  for (i = 0; i < TD.length; i++)
    if (TD[i].new_id != TD[i].old_id) {
      break;
    }
  if (i == TD.length) {
    alert("You Win");
    for (i = 0; i < TD.length; i++)
      TD[i].onclick = function () {
        //do nothing;
      }
  }
}

function start() {
  var TD = document.getElementsByTagName("td");

  for (var i = 0; i < TD.length; i++) {
    TD[i].onclick = function() {
      if(this.new_id != 15) {
        var TD = document.getElementsByTagName("td");
        var i = this.old_id;
        if (i%4 != 0&&TD[i-1].new_id == 15) {
          ChangeToNone(this, TD[i-1]);
        }
        else if (i%4 != 3&&TD[i+1].new_id == 15) {
          ChangeToNone(this, TD[i+1]);
        }
        else if (i > 3&&TD[i-4].new_id == 15) {
          ChangeToNone(this, TD[i-4]);
        }
        else if (i < 12&&TD[i+4].new_id == 15) {
          ChangeToNone(this, TD[i+4]);
        }
      }
      gameOver();
    }
  }

  ramdomSet();
}

window.onload = function() {
  Init();
  $("button").click(start);
}

