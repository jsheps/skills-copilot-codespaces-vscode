function skillsMember()
{
    var member = new Object();
    member.name = "John Doe";
    member.age = 30;
    member.skills = ["JavaScript", "HTML", "CSS"];
    member.address = {
        street: "123 Main St",
        city: "New York",
        state: "NY"
    };
    member.getSkills = function() {
        return this.skills;
    };
    member.getAge = function() {
        return this.age;
    };
    return member;
}




