# MarsRover
Mars based coding challenge

I've created a simple typescript app using node. This provides a program that will take a given input, split it into corresponding lines and either deploy a new Rover or move the most recenty deployed Rover depending on the line number.

For the original exercise, I experimented with using an enum for bearing, but later found that the limitations meant that my code couldnt be as dynamic as I'd like, so I refactored to an object literal where a simple string is used for property values making for easier referencing to and from the properties and their values.
A core tenet of the project is a custom Vector2 object. I created this to be a very simple common component used to store co-ordinates, and facilitate numerical <-> string coordinate conversions and easy grid based data storage.
To move Rovers, we take a position, a bearing to move in, and a move speed to calculate the updated position based on a direction and speed.
To rotate, we take either L or R and use number based rotations (ie an iteration of one integer in either +ve or -ve direction will correspond to either a right or left turn respectively).

A MissionController class handles a collection of rovers, and is responsible for taking a whole page of input and deciding whether we have a deploy or move command based on line number. (We get the line number and ascertain if even or odd, after omitting the first line of map size).
Each rover is deployed with an initial Vector2 position and bearing. 
Each Rover has a Navigator component that handles positional calculations and calculates movement and rotation, and is able to interpret a string of commands passed in by the MissionController. The idea here was that you can swap out a Navigator for a more complex one in the future, or navigators designed fr different terrain types. A few properties are replicated here too, as each individual rover can have its own movement range if needs be. Currently that is set to the size of our grid.

Here, the rovers output is displayed using console.log. The ShowLocation can be modified to output in any different way to extend the UI of the project. The idea was to make sure the baic output is satisfied.

# Testing
The project uses jest to assert that dummy input data is processed correctly. Looking forward, it would be nice to be able to modify the dummy input, and have dynamic assertions based on that input. But currently, the expected positions and rotations of rovers under test in mission-controller.spec are hard-coded.

# Build and run:
This is a node project using node v12.13.0.
You will need npm (or preferably yarn)
https://yarnpkg.com/getting-started/install

From the command line, in the project's irectory, run either "npm install" or, if using yarn, run "yarn" to install node modules.
To run the unit tests, you will need to have jest setup on the cli
https://jestjs.io/docs/cli

Or if using yarn again, you may be able to simply type "yarn test" in the command line.

To run the project type any one of the following:
 - yarn start
 - npm run start

# Next steps
*There are a number of improvements and extensions I considered during this exercise:*
 + A burning next step for myself during this exercise was to be able to visualise both the grid and the rovers' positions on that grid on a UI. A React UI could start simple and be quickly extended. This would also help visualise and debug the rovers' movements.
 + Another improvement could be to validate whether a tile is occupied by another rover or not, as they can currently stack. A structure of tile informatin added to the plateau class could help with this. We could track the state of a tile, and add additional statuses to them to allow for perhaps difficult terrain, impassable objects etc.
 + I felt that some further work could be done around validation, there are still some assumptions that the code makes in terms of order of command strings. Whil effort has been made to guard against malformed line structures, there is little guarding against input files where commands are not in the expected order.
 + A database to store rovers, to support multiple fleets, and also multiple missions. The MissionController class could have a service that will fetch a given missions details and associated fleet and process a command list on that.
 + Feedback for users, if a rover is unable to make a move, would they stop there? Would they carry on with the mission where possible? Some feedback to users would be good, so that we can make a decision when a rover has hit a boundary for example.
Different types of rovers, by switching out the Navigator class, we can have rovers that can move differently over terrain and calculate their movements differently.

