function Blob (x, y, r, isTail, isAI, color)
{
    this.pos = createVector(x,y);
    this.r = r;
    this.speed = createVector(0,0);
    this.color = color;
    this.mass = 0;
    this.isTail = isTail;
    this.isAI = isAI;

    this.update = function (difX, difY, speed)
    {
        var newSpeed = createVector(difX, difY);
        newSpeed .setMag(speed); 
        this.speed.lerp(newSpeed, 1); // cкорость поворота
        this.pos.add(this.speed);
    }

    this.eatingBlobs = function (food)
    {
        var distance = p5.Vector.dist(this.pos, food.pos);
        if (!this.isTail && distance < this.r + food.r)
        {
            this.isAI ? this.r += 3 : this.r++; 
            this.isAI ? this.mass += 3 : this.mass++;
            return true;
        } 
        return false;
    }

    this.eatingSnakes = function (other)
    {
        var distance = p5.Vector.dist(this.pos, other.pos);
        if (!this.isTail && distance < this.r + other.r && this.r > other.r + 3)
        {
            this.r += 3
            this.mass += other.mass;
            return true;
        } 
        return false;
    }

    this.borders = function ()
    {
        this.pos.x = this.pos.x < -width * 2 ? -width * 2 : this.pos.x;
        this.pos.x = this.pos.x > width * 2 ? width * 2 : this.pos.x;
        this.pos.y = this.pos.y < -height * 2 ? -height * 2 : this.pos.y;
        this.pos.y = this.pos.y > height * 2 ? height * 2 : this.pos.y;
    }

    this.show = function()
    {
        fill(this.color); 
        this.borders();
        ellipse(this.pos.x, this.pos.y, this.r * 2, this.r * 2);
    }
}

function Snake (head)
{
    this.head = head;
    this.tailLen = 1;
    this.tailBlobs = [];

    this.grow = function ()
    {
        if (this.head.mass / 10 > this.tailLen)
        {
            var tailBlob = new Blob(this.head.pos.x, this.head.pos.y, this.head.r - this.tailLen, true, false, this.head.color);
            this.tailBlobs[this.tailLen - 1] = tailBlob;
            this.tailLen++;
        }
    }

    this.update = function ()
    {
        this.grow();
        if (this.tailLen > 1)
            this.tailBlobs[0].update(this.head.pos.x - this.tailBlobs[0].pos.x, this.head.pos.y - this.tailBlobs[0].pos.y, 2.9);

        for (var i = 1; i < this.tailLen - 1; i++)
            this.tailBlobs[i].update(this.tailBlobs[i-1].pos.x - this.tailBlobs[i].pos.x, this.tailBlobs[i-1].pos.y - this.tailBlobs[i].pos.y, 2.9 - i*0.1); 

        for (var i = 0; i < this.tailLen - 1; i++)
            this.tailBlobs[i].r = this.head.r - (i + 1) * 2;
    }

    this.show = function ()
    {
        for (var i = 0; i < this.tailLen - 1; i++)
            if (this.tailBlobs[i] != undefined) this.tailBlobs[i].show(); // условие для непредвиденных ошибок    
    }
}