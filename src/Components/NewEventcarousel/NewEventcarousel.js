import React from 'react'
import "./hello"
import "./neweventcarousel.css"

const NewEventcarousel = () => {
    const arrowbackword=">";
    const arrowforward="<"
  return (
    <div id='body'>
    {/* <!-- carousel --> */}
    <div class="carousel">
        {/* <!-- list item  all events item is here one by one --> */}
        <div class="list">
            {/* <!-- this is the D'bugger event section --> */}
            <div class="item">
                <img src="https://ik.imagekit.io/laqshya/event%20carousel/image2.0/DBugger.png?updatedAt=1711803490270"/>
                <div class="content">
                    <div class="author">TECHNICAL</div>
                    <div class="title">D'BUGGER</div>
                    <div class="topic">11-12 APRIL</div>
                    <div class="des">
                        {/* <!-- lorem 50 --> */}
                        This event is based on C, C++, JAVA, and Python language. Participants have to solve MCQs & programming problems. The event will comprise 3 rounds.
                    </div>
                    <div class="buttons">
                        <button>SEE MORE</button>
                        <button>LET'S GO</button>
                    </div>
                </div>
            </div>
            {/* <!-- this is the ESCAPE ROOM event section --> */}
            <div class="item">
                <img src="https://ik.imagekit.io/laqshya/event%20carousel/image2.0/Escaperoom.png?updatedAt=1711803107973"/>
                <div class="content">
                    <div class="author">GAMES</div>
                    <div class="title">ESCAPE ROOM</div>
                    <div class="topic">11-12 APRIL</div>
                    <div class="des">
                        The event is aimed to challenge participant’s problem-solving abilities, teamwork skills, and quick thinking in a simulated escape scenario.
                    </div>
                    <div class="buttons">
                        <button>SEE MORE</button>
                        <button>LET'S GO</button>
                    </div>
                </div>
            </div>
            {/* <!-- this is the BOTTEL JET event section --> */}
            <div class="item">
                <img src="https://ik.imagekit.io/laqshya/event%20carousel/image2.0/botteljet.png?updatedAt=1711803481799"/>
                <div class="content">
                    <div class="author">TECHNICAL</div>
                    <div class="title">BOTTEL JET</div>
                    <div class="topic">11-12 APRIL</div>
                    <div class="des">
                        In this event, the participants will be asked to make a bottle of their own, which they will launch via the launcher, and distance will be the criteria of winning.
                    </div>
                    <div class="buttons">
                        <button>SEE MORE</button>
                        <button>LET'S GO</button>
                    </div>
                </div>
            </div>
            {/* <!-- this is the ANGRY BIRD event section --> */}
            <div class="item">
                <img src="https://ik.imagekit.io/laqshya/event%20carousel/image2.0/angreebird.png?updatedAt=1711803489749"/>
                <div class="content">
                    <div class="author">GAMES</div>
                    <div class="title">ANGRY BIRDS</div>
                    <div class="topic">11-12 APRIL</div>
                    <div class="des">
                        As we know that in angry birds the blocks are hit by using different birds. In this game a large catapult shall be used to accelerate a ball to hit the target. Hitting of target helps to gain points. 
                    </div>
                    <div class="buttons">
                        <button>SEE MORE</button>
                        <button>LET'S GO</button>
                    </div>
                </div>
            </div>
            {/* <!-- this is the MAKE YOUR MOVE event section --> */}
            <div class="item">
                <img src="https://ik.imagekit.io/laqshya/event%20carousel/image2.0/angreebird.png?uphttps://ik.imagekit.io/laqshya/event%20carousel/image2.0/MYM.jpg?updatedAt=1711802852908datedAt=1711803489749"/>
                <div class="content">
                    <div class="author">CULTURAL</div>
                    <div class="title">MAKE YOUR MOVE</div>
                    <div class="topic">11-12 APRIL</div>
                    <div class="des">
                        {/* <!-- lorem 50 --> */}
                        To conduct the cultural fest in the name of “Make Your Move”, Dance offers dancers a chance to explore their creativity through movement.
                    </div>
                    <div class="buttons">
                        <button>SEE MORE</button>
                        <button>LET'S GO</button>
                    </div>
                </div>
            </div>
            {/* <!-- this is the VOLLEYBALL event section --> */}
            <div class="item">
                <img src="https://ik.imagekit.io/laqshya/event%20carousel/image2.0/vollyball.png?updatedAt=1711803108482"/>
                <div class="content">
                    <div class="author">GAMES</div>
                    <div class="title">VOLLEYBALL</div>
                    <div class="topic">11-12 APRIL</div>
                    <div class="des">
                        {/* <!-- lorem 50 --> */}
                        A volleyball game consists of two teams of six players each, separated by a net. The six volleyball court positions are setter, middle blocker, outside hitter, opposite hitter, libero and serving specialist.
                    </div>
                    <div class="buttons">
                        <button>SEE MORE</button>
                        <button>LET'S GO</button>
                    </div>
                </div>
            </div>
            {/* <!-- this is the CRICKET event section --> */}
            <div class="item">
                <img src="https://ik.imagekit.io/laqshya/event%20carousel/image2.0/cricket.png?updatedAt=1711803485922" />
                <div class="content">
                    <div class="author">GAMES</div>
                    <div class="title">CRICKET</div>
                    <div class="topic">11-12 APRIL</div>
                    <div class="des">
                        {/* <!-- lorem 50 --> */}
                        Tennis Cricket is an variant of the game of cricket.The main aim of the game is to score more runs than the opponent by hitting fours to win the match.
                    </div>
                    <div class="buttons">
                        <button>SEE MORE</button>
                        <button>LET'S GO</button>
                    </div>
                </div>
            </div>
             {/* <!-- this is the PLAY WITH BOND event section --> */}
            <div class="item">
                <img src="https://ik.imagekit.io/laqshya/event%20carousel/image2.0/playwithbonds.png?updatedAt=1711803105349" />
                <div class="content">
                    <div class="author">TECHNICAL</div>
                    <div class="title">PLAY WITH BOND</div>
                    <div class="topic">11-12 APRIL</div>
                    <div class="des">
                        {/* <!-- lorem 50 --> */}
                        Let's play with bond is the new technical event for all the students it is designed on the basis of chemistry of chemical bonding.
                    </div>
                    <div class="buttons">
                        <button>SEE MORE</button>
                        <button>LET'S GO</button>
                    </div>
                </div>
            </div>
              {/* <!-- this is the BGMI event section --> */}
            <div class="item">
                <img src="https://ik.imagekit.io/laqshya/event%20carousel/image2.0/bgmi.png?updatedAt=1711803489717" />
                <div class="content">
                    <div class="author">GAMES</div>
                    <div class="title">BGMI</div>
                    <div class="topic">11-12 APRIL</div>
                    <div class="des">
                        {/* <!-- lorem 50 --> */}
                        By participating in this tournament, you agree to these general rules and the 
                        competition-specific rules applicable to this tournament.
                    </div>
                    <div class="buttons">
                        <button>SEE MORE</button>
                        <button>LET'S GO</button>
                    </div>
                </div>
            </div>
            {/* <!-- this is the FREEFIRE event section --> */}
            <div class="item">
                <img src="https://ik.imagekit.io/laqshya/event%20carousel/image2.0/freefire.png?updatedAt=1711803483876" />
                <div class="content">
                    <div class="author">GAMES</div>
                    <div class="title">FREEFIRE</div>
                    <div class="topic">11-12 APRIL</div>
                    <div class="des">
                        {/* <!-- lorem 50 --> */}
                        Free Fire is a free to play battle royale game developed and published by Garena for Android and iOS. It was released on 8 December 2017.
                    </div>
                    <div class="buttons">
                        <button>SEE MORE</button>
                        <button>LET'S GO</button>
                    </div>
                </div>
            </div>
            {/* <!-- this is the RIWAAZ event section --> */}
            <div class="item">
                <img src="https://ik.imagekit.io/laqshya/event%20carousel/image2.0/riwaz.jpg?updatedAt=1711802874244"/>
                <div class="content">
                    <div class="author">CULTURAL</div>
                    <div class="title">RIWAAZ</div>
                    <div class="topic">11-12 APRIL</div>
                    <div class="des">
                        {/* <!-- lorem 50 --> */}
                        The ramp walk which describes the creation of clothing, footwear, accessories, cosmetics, and jewellery of different cultural aesthetics. 
                    </div>
                    <div class="buttons">
                        <button>SEE MORE</button>
                        <button>LET'S GO</button>
                    </div>
                </div>
            </div>
            {/* <!-- this is the FOOTBALL event section --> */}
            <div class="item">
                <img src="https://ik.imagekit.io/laqshya/event%20carousel/image2.0/FUTSAL.jpg?updatedAt=1711802889594" />
                <div class="content">
                    <div class="author">GAMES</div>
                    <div class="title">FUTSAL</div>
                    <div class="topic">11-12 APRIL</div>
                    <div class="des">
                        {/* <!-- lorem 50 --> */}
                        Futsal, or futsala, is a variant of association of football played on a smaller field and mainly indoors. It can be considered a version of five-a side football . 
                    </div>
                    <div class="buttons">
                        <button>SEE MORE</button>
                        <button>LET'S GO</button>
                    </div>
                </div>
            </div>
            {/* <!-- this is the SUR AUR SAAZ event section --> */}
            <div class="item">
                <img src="https://ik.imagekit.io/laqshya/event%20carousel/image2.0/FUTSAL.jpg?updathttps://ik.imagekit.io/laqshya/event%20carousel/image2.0/suraursaaz.jpg?updatedAt=1711818583665edAt=1711802889594" />
                <div class="content">
                    <div class="author">CULTURAL</div>
                    <div class="title">SUR AUR SAAZ</div>
                    <div class="topic">11-12 APRIL</div>
                    <div class="des">
                        {/* <!-- lorem 50 --> */}
                        Singing, the production of musical tones by means of the human voice.Music binds our soul, heart and emotions. Music is the best method of relaxation. 
                    </div>
                    <div class="buttons">
                        <button>SEE MORE</button>
                        <button>LET'S GO</button>
                    </div>
                </div>
            </div>
              {/* <!-- this is the ROBO GO CARTING event section --> */}
              <div class="item">
                <img src="https://ik.imagekit.io/laqshya/event%20carousel/image2.0/robogocarting.png?updatedAt=1711803106425" />
                <div class="content">
                    <div class="author">ROBOTICS</div>
                    <div class="title">ROBO GO CARTING</div>
                    <div class="topic">11-12 APRIL</div>
                    <div class="des">
                        {/* <!-- lorem 50 --> */}
                        Design a robot either wired or wireless within the specified dimensions that can operated manually and 
can travel through all turns of the track.
                    </div>
                    <div class="buttons">
                        <button>SEE MORE</button>
                        <button>LET'S GO</button>
                    </div>
                </div>
            </div>
            {/* <!-- this is the SAND ROVER event section --> */}
            <div class="item">
                <img src="https://ik.imagekit.io/laqshya/event%20carousel/image2.0/sandrover.jpg?updatedAt=1711802874268" />
                <div class="content">
                    <div class="author">ROBOTICS</div>
                    <div class="title">SAND ROVER</div>
                    <div class="topic">11-12 APRIL</div>
                    <div class="des">
                        {/* <!-- lorem 50 --> */}
                        In this event, participants have to make a remote-controlled bot that can be wired or wireless. They have to travel through a track (given below) which is also made by them in their home 
                    </div>
                    <div class="buttons">
                        <button>SEE MORE</button>
                        <button>LET'S GO</button>
                    </div>
                </div>
            </div>
             {/* <!-- this is the TECH FORMATION event section --> */}
             <div class="item">
                <img src="https://ik.imagekit.io/laqshya/event%20carousel/image2.0/techformation.jpg?updatedAt=1711802870746" />
                <div class="content">
                    <div class="author">TECHNICAL</div>
                    <div class="title">TECH FORMATION</div>
                    <div class="topic">11-12 APRIL</div>
                    <div class="des">
                        {/* <!-- lorem 50 --> */}
                        Tech formulation is a pharmaceutical technical event in which participants will be demonstrating the 
product made by the participants and all the evaluation parameter is done by the following 
parameters.
                    </div>
                    <div class="buttons">
                        <button>SEE MORE</button>
                        <button>LET'S GO</button>
                    </div>
                </div>
            </div>
        </div>

        {/* <!-- list thumnail --> */}
        <div class="thumbnail">
            <div class="item">
                <img src="https://ik.imagekit.io/laqshya/event%20carousel/image2.0/DBugger.png?updatedAt=1711803490270" />
                <div class="content">
                    <div class="title">
                        D'BUGGER
                    </div>
                    <div class="description">
                        ..
                    </div>
                </div>
            </div>
            <div class="item">
                <img src="https://ik.imagekit.io/laqshya/event%20carousel/image2.0/Escaperoom.png?updatedAt=1711803107973" />
                <div class="content">
                    <div class="title">
                        ESCAPE ROOM
                    </div>
                    <div class="description">
                        ..
                    </div>
                </div>
            </div>
            <div class="item">
                <img src="https://ik.imagekit.io/laqshya/event%20carousel/image2.0/botteljet.png?updatedAt=1711803481799" />
                <div class="content">
                    <div class="title">
                        BOTTEL JET
                    </div>
                    <div class="description">
                        ..
                    </div>
                </div>
            </div>
            {/* <!--  thumnail ANGRY BIRDS--> */}
            <div class="item">
                <img src="https://ik.imagekit.io/laqshya/event%20carousel/image2.0/angreebird.png?updatedAt=1711803489749" />
                <div class="content">
                    <div class="title">
                        ANGRY BIRDS
                    </div>
                    <div class="description">
                        ..
                    </div>
                </div>
            </div>
            {/* <!--  thumnail MAKE YOUR MOVE--> */}
            <div class="item">
                <img src="https://ik.imagekit.io/laqshya/event%20carousel/image2.0/angreebird.png?uphttps://ik.imagekit.io/laqshya/event%20carousel/image2.0/MYM.jpg?updatedAt=1711802852908datedAt=1711803489749" />
                <div class="content">
                    <div class="title">
                        MAKE YOUR MOVE
                    </div>
                    <div class="description">
                       ..
                    </div>
                </div>
            </div>
            {/* <!--  thumnail VOLLEYBALL--> */}
            <div class="item">
                <img src="https://ik.imagekit.io/laqshya/event%20carousel/image2.0/vollyball.png?updatedAt=1711803108482" / >
                <div class="content">
                    <div class="title">
                        VOLLEYBALL
                    </div>
                    <div class="description">
                       ..
                    </div>
                </div>
            </div>
            {/* <!--  thumnail CRICKET--> */}
            <div class="item">
                <img src="https://ik.imagekit.io/laqshya/event%20carousel/image2.0/cricket.png?updatedAt=1711803485922" />
                <div class="content">
                    <div class="title">
                        CRICKET
                    </div>
                    <div class="description">
                        ..
                    </div>
                </div>
            </div>
            {/* <!--  thumnail PLAY WITH BOND--> */}
            <div class="item">
                <img src="https://ik.imagekit.io/laqshya/event%20carousel/image2.0/playwithbonds.png?updatedAt=1711803105349" />
                <div class="content">
                    <div class="title">
                        PLAY WITH BOND
                    </div>
                    <div class="description">
                        ...
                    </div>
                </div>
            </div>
             {/* <!--  thumnail BGMI--> */}
            <div class="item">
                <img src="https://ik.imagekit.io/laqshya/event%20carousel/image2.0/bgmi.png?updatedAt=1711803489717"/ >
                <div class="content">
                    <div class="title">
                        BGMI
                    </div>
                    <div class="description">
                        ..
                    </div>
                </div>
            </div>
            {/* <!--  thumnail FREEFIRE--> */}
            <div class="item">
                <img src="https://ik.imagekit.io/laqshya/event%20carousel/image2.0/freefire.png?updatedAt=1711803483876" />
                <div class="content">
                    <div class="title">
                        FREEFIRE
                    </div>
                    <div class="description">
                       ..
                    </div>
                </div>
            </div>
            {/* <!--  thumnail RIWAAZ--> */}
            <div class="item">
                <img src="https://ik.imagekit.io/laqshya/event%20carousel/image2.0/riwaz.jpg?updatedAt=1711802874244" />
                <div class="content">
                    <div class="title">
                        RIWAAZ
                    </div>
                    <div class="description">
                       ..
                    </div>
                </div>
            </div>
            {/* <!--  thumnail FOOTBALL--> */}
            <div class="item">
                <img src="https://ik.imagekit.io/laqshya/event%20carousel/image2.0/FUTSAL.jpg?updatedAt=1711802889594" />
                <div class="content">
                    <div class="title">
                        FUTSAL
                    </div>
                    <div class="description">
                       ..
                    </div>
                </div>
            </div>
            {/* <!--  thumnail Sur aur saaz --> */}
            <div class="item">
                <img src="https://ik.imagekit.io/laqshya/event%20carousel/image2.0/FUTSAL.jpg?updathttps://ik.imagekit.io/laqshya/event%20carousel/image2.0/suraursaaz.jpg?updatedAt=1711818583665edAt=1711802889594" />
                <div class="content">
                    <div class="title">
                        SUR AUR SAAZ
                    </div>
                    <div class="description">
                       ..
                    </div>
                </div>
            </div>
              {/* <!--  thumnail ROBO GO CARTING --> */}
              <div class="item">
                <img src="https://ik.imagekit.io/laqshya/event%20carousel/image2.0/robogocarting.png?updatedAt=1711803106425" />
                <div class="content">
                    <div class="title">
                        ROBO GO CARTING
                    </div>
                    <div class="description">
                       ..
                    </div>
                </div>
            </div>
             {/* <!--  thumnail SAND ROVER --> */}
             <div class="item">
                <img src="https://ik.imagekit.io/laqshya/event%20carousel/image2.0/robogocarting.png?updatedAt=1711803106425" />
                <div class="content">
                    <div class="title">
                        SAND ROVER
                    </div>
                    <div class="description">
                       ..
                    </div>
                </div>
            </div>
            {/* <!--  thumnail TECH FORMATION -->  */}
            <div class="item">
                <img src="https://ik.imagekit.io/laqshya/event%20carousel/image2.0/techformation.jpg?updatedAt=1711802870746" />
                <div class="content">
                    <div class="title">
                        TECH FORMATION
                    </div>
                    <div class="description">
                       ..
                    </div>
                </div>
            </div>
        </div>
        {/* <!-- next prev --> */}

        <div class="arrows">
            <button id="prev">{arrowforward}</button>
            <button id="next">{arrowbackword}</button>
        </div>
        {/* <!-- time running --> */}
        <div class="time"></div>
    </div>

    {/* <script src="hello.js"></script> */}
</div>
  )
}

export default NewEventcarousel