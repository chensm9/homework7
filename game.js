function Init() {
  var img = new Image();
  img.src = 'index.jpg';
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
  timeouts = new Array();
  nums = new Array();
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

function TdOnclick () {
   var TD = document.getElementsByTagName("td");
   for (var i = 0; i < TD.length; i++) {
    TD[i].onclick = function() {
      if(this.new_id != 15) {
        var num_id = this.new_id;
        var TD = document.getElementsByTagName("td");
        var i = this.old_id, flag = 0;
        if (i%4 != 0&&TD[i-1].new_id == 15) {
          ChangeToNone(this, TD[i-1]);
          flag = 1;
        }
        else if (i%4 != 3&&TD[i+1].new_id == 15) {
          ChangeToNone(this, TD[i+1]);
          flag = 1;
        }
        else if (i > 3&&TD[i-4].new_id == 15) {
          ChangeToNone(this, TD[i-4]);
          flag = 1;
        }
        else if (i < 12&&TD[i+4].new_id == 15) {
          ChangeToNone(this, TD[i+4]);
          flag = 1;
        }
        if (flag == 1)
          for (var j = 0; j < 16; j++) {
            if (TD[j].new_id == num_id) {
              nums.push(j);
              break;
            }
          }
      }
    }
  }
}

function TdOnclick2 () {
   var TD = document.getElementsByTagName("td");
   for (var i = 0; i < TD.length; i++) {
    TD[i].onclick = function() {
      if(this.new_id != 15) {
        var num_id = this.new_id;
        var TD = document.getElementsByTagName("td");
        var i = this.old_id, flag = 0;
        if (i%4 != 0&&TD[i-1].new_id == 15) {
          ChangeToNone(this, TD[i-1]);
          flag = 1;
        }
        else if (i%4 != 3&&TD[i+1].new_id == 15) {
          ChangeToNone(this, TD[i+1]);
          flag = 1;
        }
        else if (i > 3&&TD[i-4].new_id == 15) {
          ChangeToNone(this, TD[i-4]);
          flag = 1;
        }
        else if (i < 12&&TD[i+4].new_id == 15) {
          ChangeToNone(this, TD[i+4]);
          flag = 1;
        }
        if (flag)
          for (var j = 0; j < 16; j++) {
            if (TD[j].new_id == num_id) {
              nums.push(j);
              break;
            }
          }
      }
      gameOver();
    }
  }
}

function ramdomSet() {
  TdOnclick();
  var TD = document.getElementsByTagName("td");
  for (var i = 0; i < 200; i++) {
    var num = Math.round(Math.random() * 15);
    if (nums[nums.length-1] != num)
      TD[num].onclick();
  }
  document.getElementById("reback").onclick = function () {
    reduction(nums);
  };
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

function reduction (nums) {
  TdOnclick();
  for (var i = nums.length-1; i >= 0; i--) {
    timeouts.push(setTimeout("$('td')["+nums[i]+"].onclick()", (nums.length-i)*200));
  }
  $("#reback").addClass("hide");
}

function clearTimeOuts () {
  for (var i = 0; i < timeouts.length; i++)
    clearTimeout(timeouts[i]);
}

function start() {
  clearTimeOuts();
  ramdomSet();
  $("#reback").removeClass("hide");
  TdOnclick2();
}

window.onload = function() {
  Init();
  $("#start").click(start);
}
