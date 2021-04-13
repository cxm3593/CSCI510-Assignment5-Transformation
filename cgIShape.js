class cgIShape {
    constructor () {
        this.points = [];
        this.bary = [];
        this.indices = [];
    }
    
    addTriangle (x0,y0,z0,x1,y1,z1,x2,y2,z2) {
        var nverts = this.points.length / 4;
        
        // push first vertex
        this.points.push(x0);  this.bary.push (1.0);
        this.points.push(y0);  this.bary.push (0.0);
        this.points.push(z0);  this.bary.push (0.0);
        this.points.push(1.0);
        this.indices.push(nverts);
        nverts++;
        
        // push second vertex
        this.points.push(x1); this.bary.push (0.0);
        this.points.push(y1); this.bary.push (1.0);
        this.points.push(z1); this.bary.push (0.0);
        this.points.push(1.0);
        this.indices.push(nverts);
        nverts++
        
        // push third vertex
        this.points.push(x2); this.bary.push (0.0);
        this.points.push(y2); this.bary.push (0.0);
        this.points.push(z2); this.bary.push (1.0);
        this.points.push(1.0);
        this.indices.push(nverts);
        nverts++;
    }
}

class Cube extends cgIShape {
    
    constructor (subdivisions) {
        super();
        this.makeCube (subdivisions);
    }
    
    makeCube (subdivisions)  {
        
        // fill in your cube code here.
		var triangles = [];
		const step = 1 / subdivisions;
		var tri;

		// Front
		for(var i=0; i<subdivisions; i++){
			for(var j=0;j<subdivisions;j++){
				var v0 = [-0.5 + i*step, -0.5 + j*step, 0.5];
				var v1 = [-0.5 + (i+1)*step, -0.5 + j*step, 0.5];
				var v2 = [-0.5 + i*step, -0.5 + (j+1)*step, 0.5];
				var v3 = [-0.5 + (i+1)*step, -0.5 + (j+1)*step, 0.5];

				triangles.push([v0, v3, v2]);
				triangles.push([v0, v1, v3]);
			}
		}

		// Left
		for(var i=0; i<subdivisions; i++){
			for(var j=0;j<subdivisions;j++){
				var v0 = [-0.5, -0.5+i*step, -0.5+j*step];
				var v1 = [-0.5, -0.5+(i+1)*step, -0.5+j*step];
				var v2 = [-0.5, -0.5+i*step, -0.5+(j+1)*step];
				var v3 = [-0.5, -0.5+(i+1)*step, -0.5+(j+1)*step];

				triangles.push([v0, v2, v3]);
				triangles.push([v0, v3, v1]);
			}
		}

		// Right
		for(var i=0; i<subdivisions; i++){
			for(var j=0;j<subdivisions;j++){
				var v0 = [0.5, -0.5+i*step, -0.5+j*step];
				var v1 = [0.5, -0.5+(i+1)*step, -0.5+j*step];
				var v2 = [0.5, -0.5+i*step, -0.5+(j+1)*step];
				var v3 = [0.5, -0.5+(i+1)*step, -0.5+(j+1)*step];

				triangles.push([v0, v3, v2]);
				triangles.push([v0, v1, v3]);
			}
		}

		// Top
		for(var i=0; i<subdivisions; i++){
			for(var j=0;j<subdivisions;j++){
				var v0 = [-0.5+i*step, 0.5, -0.5+j*step];
				var v1 = [-0.5+(i+1)*step, 0.5, -0.5+j*step];
				var v2 = [-0.5+i*step, 0.5, -0.5+(j+1)*step];
				var v3 = [-0.5+(i+1)*step, 0.5, -0.5+(j+1)*step];

				triangles.push([v0, v2, v3]);
				triangles.push([v0, v3, v1]);
			}
		}

		// Back
		for(var i=0; i<subdivisions; i++){
			for(var j=0;j<subdivisions;j++){
				var v0 = [-0.5 + i*step, -0.5 + j*step, -0.5];
				var v1 = [-0.5 + (i+1)*step, -0.5 + j*step, -0.5];
				var v2 = [-0.5 + i*step, -0.5 + (j+1)*step, -0.5];
				var v3 = [-0.5 + (i+1)*step, -0.5 + (j+1)*step, -0.5];

				triangles.push([v0, v2, v3]);
				triangles.push([v0, v3, v1]);
			}
		}

		// Buttom
		for(var i=0; i<subdivisions; i++){
			for(var j=0;j<subdivisions;j++){
				var v0 = [-0.5+i*step, -0.5, -0.5+j*step];
				var v1 = [-0.5+(i+1)*step, -0.5, -0.5+j*step];
				var v2 = [-0.5+i*step, -0.5, -0.5+(j+1)*step];
				var v3 = [-0.5+(i+1)*step, -0.5, -0.5+(j+1)*step];

				triangles.push([v0, v3, v2]);
				triangles.push([v0, v1, v3]);
			}
		}

		// add triangles to finish the make process
		for (tri of triangles){
			this.addTriangle(
				tri[0][0], tri[0][1], tri[0][2],
				tri[1][0], tri[1][1], tri[1][2],
				tri[2][0], tri[2][1], tri[2][2]
				);
		}
    }
}


class Cylinder extends cgIShape {

    constructor (radialdivision,heightdivision) {
        super();
        this.makeCylinder (radialdivision,heightdivision);
    }
    
    makeCylinder (radialdivision,heightdivision){
        // fill in your cylinder code here
		var triangles = [];
		var circ_triangles = []; // Contains triangles from the top and bottom
		var side_triangles = []; // Contains triagnles from the side and 

		var Bottom_Center = [0, -0.5, 0];
		var Top_Center = [0, 0.5, 0];
		
		const radius = 0.5;

		
		var alpha_deg = 0.0;
		var step = 360 / radialdivision;
		var vertical_step = 1 / heightdivision;

		var tri;

		// Generate top and bottom triangles
		for(var i=0; i<radialdivision; i++){


			var b0 = [radius * Math.cos(radians(alpha_deg)), -0.5, radius * Math.sin(radians(alpha_deg))];
			var t0 = [radius * Math.cos(radians(alpha_deg)),  0.5, radius * Math.sin(radians(alpha_deg))];
			alpha_deg += step;
			var b1 = [radius * Math.cos(radians(alpha_deg)), -0.5, radius * Math.sin(radians(alpha_deg))];
			var t1 = [radius * Math.cos(radians(alpha_deg)),  0.5, radius * Math.sin(radians(alpha_deg))];

			circ_triangles.push([Bottom_Center, b0, b1]);
			circ_triangles.push([Top_Center, t1, t0]);

			// side_triangles.push([t0, b0, t1]);
			// side_triangles.push([t1, b0, b1]);

			var height_mark = -0.5;

			for(var j=0; j<heightdivision; j++){
				var m0 = [b0[0], height_mark, b0[2]];
				var m1 = [b1[0], height_mark, b1[2]];
				height_mark += vertical_step;
				var m2 = [b0[0], height_mark, b0[2]];
				var m3 = [b1[0], height_mark, b1[2]];

				side_triangles.push([m3, m1, m0]);
				side_triangles.push([m2, m3, m0]);
			}
		}

		triangles = circ_triangles.concat(side_triangles);

		// add triangles to finish the make process
		for (tri of triangles){
			this.addTriangle(
				tri[0][0], tri[0][1], tri[0][2],
				tri[1][0], tri[1][1], tri[1][2],
				tri[2][0], tri[2][1], tri[2][2]
				);
		}
    }
}

class Cone extends cgIShape {

    constructor (radialdivision, heightdivision) {
        super();
        this.makeCone (radialdivision, heightdivision);
    }
    
    
    makeCone (radialdivision, heightdivision) {
    
        // Fill in your cone code here.
		var triangles = [];
		var circ_triangles = []; // Contains triangles from the top and bottom
		var side_triangles = []; // Contains triangles from the side and 

		var Bottom_Center = [0, -0.5, 0];
		var Apex = [0, 0.5, 0];

		const radius = 0.5;
		var alpha_deg = 0.0;
		var step = 360 / radialdivision;

		

		for(var i=0; i<radialdivision; i++){
			var b0 = [radius * Math.cos(radians(alpha_deg)), -0.5, radius * Math.sin(radians(alpha_deg))];
			alpha_deg += step;
			var b1 = [radius * Math.cos(radians(alpha_deg)), -0.5, radius * Math.sin(radians(alpha_deg))];

			circ_triangles.push([Bottom_Center, b0, b1]);

			//side_triangles.push([Apex, b1, b0]);
			var m0 = [b0[0], b0[1], b0[2]];
			var m1 = [b1[0], b1[1], b1[2]];
			var x0_step = (Apex[0] - b0[0]) / heightdivision;
			var y0_step = (Apex[1] - b0[1]) / heightdivision;
			var z0_step = (Apex[2] - b0[2]) / heightdivision;
			var x1_step = (Apex[0] - b1[0]) / heightdivision;
			var y1_step = (Apex[1] - b1[1]) / heightdivision;
			var z1_step = (Apex[2] - b1[2]) / heightdivision;

			for(var j=0; j<heightdivision; j++){
				if(j == heightdivision - 1){
					side_triangles.push([Apex, m1, m0]);
				}
				else{
					var m2 = [m0[0] + x0_step, m0[1]+y0_step, m0[2]+z0_step];
					var m3 = [m1[0] + x1_step, m1[1]+y1_step, m1[2]+z1_step];
					side_triangles.push([m2, m1, m0]);
					side_triangles.push([m3, m1, m2]);

					m0 = m2;
					m1 = m3;
				}
			}
		}

		triangles = circ_triangles.concat(side_triangles);

		var tri;
		// add triangles to finish the make process
		for (tri of triangles){
			this.addTriangle(
				tri[0][0], tri[0][1], tri[0][2],
				tri[1][0], tri[1][1], tri[1][2],
				tri[2][0], tri[2][1], tri[2][2]
				);
		}
    }
}
    
class Sphere extends cgIShape {

    constructor (slices, stacks) {
        super();
        this.makeSphere (slices, stacks);
    }
    
    makeSphere (slices, stacks) {
        // fill in your sphere code here
		var triangles = [];
		var origin = [0.0, 0.0, 0.0];
		const radius = 0.5;
		const longi_step = radians(360 / slices); // in radian
		const lati_step = radians(180 / stacks); // in radian

		var theta = 0.0;
		

		for (var i=0; i<slices; i++){

			var phi = 0.0;
			for(var j=0; j<stacks; j++){
				var v1 = [radius * Math.sin(theta) * Math.sin(phi), radius * Math.cos(phi), radius * Math.cos(theta) * Math.sin(phi)];
				var v2 = [radius * Math.sin(theta + longi_step) * Math.sin(phi), radius * Math.cos(phi), radius * Math.cos(theta + longi_step) * Math.sin(phi)];
				var v3 = [radius * Math.sin(theta) * Math.sin(phi + lati_step), radius * Math.cos(phi + lati_step), radius * Math.cos(theta) * Math.sin(phi + lati_step)];
				var v4 = [radius * Math.sin(theta + longi_step) * Math.sin(phi + lati_step), radius * Math.cos(phi + lati_step), radius * Math.cos(theta + longi_step) * Math.sin(phi + lati_step)];

				triangles.push([v1, v3, v2]);
				triangles.push([v2, v3, v4]);

				phi += lati_step;
			}

			theta += longi_step;
		}

		var tri;
		for (tri of triangles){
			this.addTriangle(
				tri[0][0], tri[0][1], tri[0][2],
				tri[1][0], tri[1][1], tri[1][2],
				tri[2][0], tri[2][1], tri[2][2]
				);
		}
    }

}


function radians(degrees)
{
  var pi = Math.PI;
  return degrees * (pi/180);
}

