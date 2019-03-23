'use strict';


customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">communicating-hospitals documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                        <li class="link">
                            <a href="dependencies.html" data-type="chapter-link">
                                <span class="icon ion-ios-list"></span>Dependencies
                            </a>
                        </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse" ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link">AppModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link">AuthModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/HospitalsModule.html" data-type="entity-link">HospitalsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-HospitalsModule-acfb13514498d0731b5ddc12c1b1586f"' : 'data-target="#xs-controllers-links-module-HospitalsModule-acfb13514498d0731b5ddc12c1b1586f"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-HospitalsModule-acfb13514498d0731b5ddc12c1b1586f"' :
                                            'id="xs-controllers-links-module-HospitalsModule-acfb13514498d0731b5ddc12c1b1586f"' }>
                                            <li class="link">
                                                <a href="controllers/HospitalsController.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">HospitalsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-HospitalsModule-acfb13514498d0731b5ddc12c1b1586f"' : 'data-target="#xs-injectables-links-module-HospitalsModule-acfb13514498d0731b5ddc12c1b1586f"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-HospitalsModule-acfb13514498d0731b5ddc12c1b1586f"' :
                                        'id="xs-injectables-links-module-HospitalsModule-acfb13514498d0731b5ddc12c1b1586f"' }>
                                        <li class="link">
                                            <a href="injectables/HospitalsService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>HospitalsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/PreparationsModule.html" data-type="entity-link">PreparationsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-PreparationsModule-3a45b6cc750fcf641cf4bf4634434dac"' : 'data-target="#xs-controllers-links-module-PreparationsModule-3a45b6cc750fcf641cf4bf4634434dac"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-PreparationsModule-3a45b6cc750fcf641cf4bf4634434dac"' :
                                            'id="xs-controllers-links-module-PreparationsModule-3a45b6cc750fcf641cf4bf4634434dac"' }>
                                            <li class="link">
                                                <a href="controllers/PreparationsController.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">PreparationsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-PreparationsModule-3a45b6cc750fcf641cf4bf4634434dac"' : 'data-target="#xs-injectables-links-module-PreparationsModule-3a45b6cc750fcf641cf4bf4634434dac"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-PreparationsModule-3a45b6cc750fcf641cf4bf4634434dac"' :
                                        'id="xs-injectables-links-module-PreparationsModule-3a45b6cc750fcf641cf4bf4634434dac"' }>
                                        <li class="link">
                                            <a href="injectables/PreparationsService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>PreparationsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/RankingModule.html" data-type="entity-link">RankingModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-RankingModule-019e57cc86b57ad94e2f73f0bd1af58c"' : 'data-target="#xs-controllers-links-module-RankingModule-019e57cc86b57ad94e2f73f0bd1af58c"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-RankingModule-019e57cc86b57ad94e2f73f0bd1af58c"' :
                                            'id="xs-controllers-links-module-RankingModule-019e57cc86b57ad94e2f73f0bd1af58c"' }>
                                            <li class="link">
                                                <a href="controllers/RankingController.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">RankingController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-RankingModule-019e57cc86b57ad94e2f73f0bd1af58c"' : 'data-target="#xs-injectables-links-module-RankingModule-019e57cc86b57ad94e2f73f0bd1af58c"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-RankingModule-019e57cc86b57ad94e2f73f0bd1af58c"' :
                                        'id="xs-injectables-links-module-RankingModule-019e57cc86b57ad94e2f73f0bd1af58c"' }>
                                        <li class="link">
                                            <a href="injectables/HospitalsService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>HospitalsService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/RankingService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>RankingService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UserModule.html" data-type="entity-link">UserModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-UserModule-5c9b8a6fd36f8d7be939f7f3aa17e205"' : 'data-target="#xs-controllers-links-module-UserModule-5c9b8a6fd36f8d7be939f7f3aa17e205"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UserModule-5c9b8a6fd36f8d7be939f7f3aa17e205"' :
                                            'id="xs-controllers-links-module-UserModule-5c9b8a6fd36f8d7be939f7f3aa17e205"' }>
                                            <li class="link">
                                                <a href="controllers/UserController.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">UserController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-UserModule-5c9b8a6fd36f8d7be939f7f3aa17e205"' : 'data-target="#xs-injectables-links-module-UserModule-5c9b8a6fd36f8d7be939f7f3aa17e205"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UserModule-5c9b8a6fd36f8d7be939f7f3aa17e205"' :
                                        'id="xs-injectables-links-module-UserModule-5c9b8a6fd36f8d7be939f7f3aa17e205"' }>
                                        <li class="link">
                                            <a href="injectables/UserService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>UserService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse" ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/CreateHospitalDto.html" data-type="entity-link">CreateHospitalDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreatePreparationDto.html" data-type="entity-link">CreatePreparationDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserDto.html" data-type="entity-link">UserDto</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AuthenticationMiddleware.html" data-type="entity-link">AuthenticationMiddleware</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DatePipe.html" data-type="entity-link">DatePipe</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DateUnitPipe.html" data-type="entity-link">DateUnitPipe</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DistancePipe.html" data-type="entity-link">DistancePipe</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/HospitalIdPipe.html" data-type="entity-link">HospitalIdPipe</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LatitudinePipe.html" data-type="entity-link">LatitudinePipe</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LoggerService.html" data-type="entity-link">LoggerService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LongitudinePipe.html" data-type="entity-link">LongitudinePipe</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PreparationTypePipe.html" data-type="entity-link">PreparationTypePipe</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#guards-links"' :
                            'data-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse" ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/AdminGuard.html" data-type="entity-link">AdminGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/UserGuard.html" data-type="entity-link">UserGuard</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse" ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/GeoJSONMultiPoint.html" data-type="entity-link">GeoJSONMultiPoint</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Hospital.html" data-type="entity-link">Hospital</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Preparation.html" data-type="entity-link">Preparation</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Rank.html" data-type="entity-link">Rank</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TypeRank.html" data-type="entity-link">TypeRank</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/User.html" data-type="entity-link">User</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse" ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});