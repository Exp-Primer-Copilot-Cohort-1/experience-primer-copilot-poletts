function skillMember() {
    this.name = 'skillMember';
    this.age = 30;
    this.job = 'developer';
    this.sayName = function () {
        console.log(this.name);
    };
}