import img from "/Workshop2.jpg";
import stc from "/STC.jpg"

export default function About() {
  return (
    <div>
      <div className="text-3xl font-semibold mb-5">About</div>
      <div className="mb-5">
        <div className="text-2xl uppercase">Northern Railways locomotive workshop</div>
        <div className="flex">
          <div className="w-[80%]">
            The Northern Railways Locomotive Workshop located in Charbagh,
            Lucknow, stands as a cornerstone of India's railway infrastructure.
            Established to cater to the maintenance and repair needs of
            locomotives, this workshop plays a vital role in ensuring the
            operational efficiency and safety of trains traversing the Northern
            region of India.
            <br />
            Equipped with state-of-the-art facilities and a dedicated workforce
            of skilled engineers, technicians, and support staff, the Charbagh
            Locomotive Workshop is known for its expertise in locomotive
            overhauling, refurbishment, and modernization. It serves as a hub
            where locomotives undergo thorough inspections, repairs, and
            upgrades to maintain peak performance standards.
            <br />
            Beyond its technical capabilities, the workshop contributes
            significantly to the local economy by providing employment
            opportunities and fostering skill development in the railway
            maintenance sector. Its strategic location in Lucknow, a major city
            in Uttar Pradesh, enhances accessibility and logistical efficiency
            for servicing locomotives operating across Uttar Pradesh and
            neighboring states.
            <br />
            The workshop's commitment to innovation, reliability, and
            sustainability underscores its role as a critical asset within
            India's extensive railway network, supporting the seamless movement
            of passengers and freight across Northern India.
          </div>
          <div
            style={{ backgroundImage: `url(${img})` }}
            className="w-1/2 bg-cover bg-center aspect-video rounded-md"
          ></div>
        </div>
      </div>
      <div>
        <div className="text-2xl uppercase">Supevisor's Training Centre Northern Railway</div>
        <div className="flex">
          <div className="w-[80%]">
            The Supervisors Training Centre in Lucknow serves as a pivotal
            institution within the Indian Railways, dedicated to nurturing the
            leadership and managerial skills of railway supervisors. Located
            strategically in Lucknow, Uttar Pradesh, this training center plays
            a crucial role in enhancing the efficiency, safety, and operational
            standards of the railway network across the Northern region of
            India.
            <br />
            At the Supervisors Training Centre, aspiring and experienced railway
            supervisors undergo comprehensive training programs tailored to
            equip them with the knowledge and skills necessary to oversee
            various aspects of railway operations. These programs cover a wide
            range of subjects, including safety protocols, operational
            management, technical proficiency, and leadership development.
            <br />
            The center boasts modern training facilities, advanced simulators,
            and qualified instructors who bring extensive practical experience
            from the railway industry. Through interactive workshops,
            simulations, and classroom sessions, supervisors receive hands-on
            training that prepares them to handle diverse challenges
            effectively.
            <br />
            Beyond technical expertise, the center emphasizes ethical conduct,
            teamwork, and customer service excellence, reflecting the Indian
            Railways' commitment to delivering superior transportation services.
          </div>
          <div
            style={{ backgroundImage: `url(${stc})` }}
            className="w-1/2 bg-cover bg-center aspect-video rounded-md"
          ></div>
        </div>
      </div>
    </div>
  );
}
