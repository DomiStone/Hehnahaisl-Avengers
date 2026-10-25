'use strict';
// Connected districts, broad piazzas and traversable alleyways. A grid tile is a city block unit.
const SIZE=32;let GRID=Array.from({length:SIZE},(_,y)=>Array.from({length:SIZE},(_,x)=>x===0||y===0||x===SIZE-1||y===SIZE-1?1:0));
function block(x,y,w,h,type=1){for(let j=y;j<y+h;j++)for(let i=x;i<x+w;i++)GRID[j][i]=type;}
[[3,3,4,5,1],[10,2,5,5,2],[18,3,4,5,3],[25,2,4,6,1],[3,11,4,5,2],[10,10,5,5,3],[18,11,4,5,1],[25,11,4,5,2],[2,20,5,4,3],[10,19,5,5,1],[18,20,4,4,2],[25,19,4,5,3],[3,27,4,3,1],[11,27,4,3,2],[19,27,3,3,1],[26,27,3,3,2]].forEach(b=>block(...b));
let GOALS=[{x:8.5,y:8.5,name:'Piazza della Luce'},{x:23.5,y:17.5,name:'Gassen am Dom'},{x:8.5,y:25.5,name:'Alter Fassmarkt'}];
let BOSS_HOME={x:23.5,y:25.5};
function wall(x,y){return GRID[Math.floor(y)]?.[Math.floor(x)]??1;}
function free(x,y,r=.23){return !wall(x-r,y-r)&&!wall(x+r,y-r)&&!wall(x-r,y+r)&&!wall(x+r,y+r);}
function moveBody(body,dx,dy,r=.23){if(free(body.x+dx,body.y,r))body.x+=dx;if(free(body.x,body.y+dy,r))body.y+=dy;}
function clearLine(ax,ay,bx,by){const d=Math.hypot(bx-ax,by-ay),n=Math.ceil(d*12);for(let i=1;i<n;i++)if(wall(ax+(bx-ax)*i/n,ay+(by-ay)*i/n))return false;return true;}
function flowFrom(x,y){const f=Array.from({length:SIZE},()=>Array(SIZE).fill(999));const sx=Math.floor(x),sy=Math.floor(y);f[sy][sx]=0;const q=[[sx,sy]];for(let i=0;i<q.length;i++){const [a,b]=q[i];for(const [dx,dy]of[[1,0],[-1,0],[0,1],[0,-1]]){let nx=a+dx,ny=b+dy;if(!wall(nx,ny)&&f[ny][nx]>f[b][a]+1){f[ny][nx]=f[b][a]+1;q.push([nx,ny]);}}}return f;}

let level=1;function setLevel(n){level=n;if(n===1){GRID=Array.from({length:SIZE},(_,y)=>Array.from({length:SIZE},(_,x)=>x===0||y===0||x===SIZE-1||y===SIZE-1?1:0));[[3,3,4,5,1],[10,2,5,5,2],[18,3,4,5,3],[25,2,4,6,1],[3,11,4,5,2],[10,10,5,5,3],[18,11,4,5,1],[25,11,4,6,2],[2,20,5,4,3],[10,19,5,5,1],[18,20,4,4,2],[25,19,4,5,3],[3,27,4,3,1],[11,27,4,3,2],[19,27,3,3,1],[26,27,3,3,2]].forEach(b=>block(...b));GOALS=[{x:8.5,y:8.5,name:'Piazza della Luce'},{x:23.5,y:17.5,name:'Gassen am Dom'},{x:8.5,y:25.5,name:'Alter Fassmarkt'}];BOSS_HOME={x:23.5,y:25.5};return;}
// Berliner Messe: broad halls, exhibit aisles, aquariums and the central prize tank.
GRID=Array.from({length:SIZE},(_,y)=>Array.from({length:SIZE},(_,x)=>x===0||y===0||x===SIZE-1||y===SIZE-1?1:0));[[3,3,5,6,2],[12,2,6,7,3],[23,3,5,6,2],[3,13,6,5,3],[13,12,6,7,1],[23,13,6,5,3],[3,23,5,6,2],[12,23,6,6,3],[23,23,5,6,2]].forEach(b=>block(...b));GOALS=[{x:9.5,y:10,name:'Köder Halle 3'},{x:21.5,y:10,name:'Sicherheitskontrolle'},{x:9.5,y:20,name:'Aquarium der Messe'}];BOSS_HOME={x:21.5,y:20};}
