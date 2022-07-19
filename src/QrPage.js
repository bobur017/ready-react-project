import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getOne } from './QrReducer';
import { useReactToPrint } from 'react-to-print';
import { Button } from 'react-bootstrap';
import { AiOutlinePrinter } from 'react-icons/ai';
import logo from "./image/photo_2022.svg"

function QrPage() {
    const dispatch = useDispatch();
    const resultAnalis = useSelector(state => state.qr.resultAnalis);
    const firstUpdate = useRef(true);
    const [userId, setUserId] = useState(useParams());
    let { id } = useParams();
    const componentRef = useRef();

    useEffect(() => {
        if (firstUpdate.current) {

        } else {
            console.log(resultAnalis, "resultAnalis");
        }
    }, [resultAnalis]);



    useEffect(() => {
        if (id && firstUpdate.current) {
            firstUpdate.current = false;
            // setUserId('17045eb2-c39b-48df-8254-5c7333dfbcc117045eb2-c39b-48df-8254-5c7333dfbcc1');
            dispatch(getOne(userId));
            console.log(userId, "userId");

        }
        // console.log(id, "userId");
        // console.log(userId, "userId");
    }, [id]);


    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });


    return (
        <div className='position-relative'>
            <div className='leftBar'>
                <a href="/" className='photo'  >
                    <img src={logo} alt="" width={"100%"} />
                    <span className='textLine text-decoration-none'>LIfe line Laboratory</span>
                </a>
            </div>

            <div>
                <div className='d-flex justify-content-center' >
                    <Button variant="secondary" onClick={handlePrint}><AiOutlinePrinter />{" "} Печать</Button>
                </div>
                <div className='content pageA' ref={componentRef}>
                    <div className='row'>
                        <div className='col-12'>
                            <div className="card border-flag pt-0 px-4 pb-1 pt-lg-5 px-lg-5 pb-lg-2 m-5">
                                <div className="d-flex mb-5 mt-3">
                                    <div className="left1 text-center">
                                        <h5>Ministry of Health of the Republic of Uzbekistan</h5>
                                        <h5>CONFIRMATION OF COVID-19 TEST RESULT</h5>
                                    </div>
                                    <div className="center1">
                                        <div className="mx-auto text-center">
                                            <h2><img src={logo} alt="" width={130} style={{ color: '#c309f7' }} /></h2>
                                        </div>
                                    </div>
                                    <div className="right1 text-center">
                                        <h5>Министерство Здравоохранения Республики Узбекистан</h5>
                                        <h5>Подтверждение результата теста COVID-19</h5>
                                    </div>
                                </div>
                                <div className="my-1">
                                    <h6>
                                        <strong>ID / Номер: </strong>
                                        <span>{resultAnalis?.id}</span>
                                    </h6>
                                </div>
                                <div className="my-1">
                                    <h6>
                                        <strong>Laboratory (name) / Лаборатория (название): </strong>
                                        <span className='text-uppercase'>{resultAnalis?.laboratoryName}</span>
                                    </h6>
                                </div>
                                <div className="my-1">
                                    <h6>
                                        <strong>Place of sampling / Место забора анализа: </strong>
                                        <span className='text-uppercase'>{resultAnalis?.placeOfSampling}</span>
                                    </h6>
                                </div>
                                <div className="my-1">
                                    <h6>
                                        <strong>Research method / Метод исследования: </strong>
                                        <span>{resultAnalis?.researchMethod}</span>
                                    </h6>
                                </div>
                                <hr style={{ border: "4px solid #bbb" }} />
                                <div className="my-1">
                                    <h6>
                                        <strong>Passport / Серия и номер паспорта: </strong>
                                        <span>{resultAnalis?.passport}</span>
                                    </h6>
                                </div>
                                <div className="my-1">
                                    <h6>
                                        <strong>Full name / Полное имя: </strong>
                                        <span>{resultAnalis?.fullName}</span>
                                    </h6>
                                </div>
                                <div className="my-1">
                                    <h6>
                                        <strong>Birth date / Дата рождения: </strong>
                                        <span>{resultAnalis?.birthDate !== undefined ? new Date(resultAnalis?.birthDate).toISOString().substring(0, 10) : null}</span>

                                    </h6>
                                </div>
                                <div className="my-1">
                                    <h6>
                                        <strong>Sex / Пол: </strong>
                                        <span>
                                            Female / Женщина
                                        </span>
                                    </h6>
                                </div>
                                <div className="my-1">
                                    <h6>
                                        <strong>Analysis date / Дата сдачи анализа: </strong>
                                        <span>{resultAnalis?.analysisDate !== undefined ?
                                            <>
                                                {new Date(resultAnalis?.analysisDate).toISOString().substring(0, 10)}
                                                {"  "}
                                                {new Date(resultAnalis?.analysisDate).toTimeString().substring(0, 5)}

                                            </>
                                            : null}</span>
                                    </h6>
                                </div>
                                <div className="my-1 d-flex align-items-baseline">
                                    <h6 className="mr-2">
                                        <strong>Test result and date / Результат и дата теста:&nbsp;</strong>
                                    </h6>
                                    <h6>
                                        <span>{resultAnalis?.result}</span>
                                        <strong>({resultAnalis?.resultDate !== undefined ?
                                            <>
                                                {new Date(resultAnalis?.resultDate).toISOString().substring(0, 10)}
                                                {"  "}
                                                {new Date(resultAnalis?.resultDate).toTimeString().substring(0, 5)}

                                            </>
                                            : null})</strong>
                                    </h6>
                                </div>
                                <div className="row my-2">

                                    <div className="text-center">
                                        {/* <div id="qrContainer" className="w-100"><canvas width="256" height="256"></canvas></div> */}
                                        <img src={"data:image/png;base64," + resultAnalis?.qrCode} width="300" height="300" />
                                    </div>

                                </div>
                                <div className="mt-4 mx-auto text-center">
                                    <h6 className="text-uppercase">
                                        <span>Ўзбекистон Республикаси Санитария-эпидемиологик осойишталик ва жамоат саломатлиги хизмати</span>
                                    </h6>
                                    <h6>
                                        <span>Манзил: </span>
                                        <span>.................................</span>
                                    </h6>
                                    <h6>
                                        <span>Телефон: </span>
                                        <a href="tel:998712761606">+998 ..............</a>
                                    </h6>
                                    <h6>
                                        <span>Email: </span>
                                        <a href="mailto:kancelyariyaresdsenm@minzdrav.uz">
                                            ..................@.......uz
                                        </a>
                                    </h6>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default QrPage