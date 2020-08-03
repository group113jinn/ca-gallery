'use strict'

$(document).ready(onInit())

function onInit() {
    createProjects();
    renderProjects();
    document.querySelector('#mail-button').addEventListener('click', onSendEmail)
}

function renderModal(idx) {
    var modalProject = gProjects.find(function(project) {
        return (project.id === idx)
    })



    var modal = ` 
   <div class="portfolio-modal modal fade" id="portfolioModal1" tabindex="-1" role="dialog" aria-hidden="false">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="close-modal" data-dismiss="modal">
          <div class="lr">
            <div class="rl"></div>
          </div>
        </div>
        <div class="container">
          <div class="row">
            <div class="col-lg-8 mx-auto">
              <div class="modal-body">
                <!-- Project Details Go Here -->
                <h2>${modalProject.name}</h2>
                <p class="item-intro text-muted">Project.</p>
                <img class="img-fluid d-block mx-auto" src="img/portfolio/${modalProject.id}.png" alt="${modalProject.name}">
                <a href="${modalProject.url}" class="text-info" target="blank">${modalProject.name}</a>
                <p>Coding Academy workshop training program.
                </p>
                <ul class="list-inline">
                  <li>Date: ${modalProject.publishedAt}</li>
                  <li>Client: {Coding Academy}	&#174;</li>
                  <li>Category: JS</li>
                </ul>
                <button class="btn btn-outline-dark" data-dismiss="modal" type="button">
                    <i class="fa fa-times"></i>
                    Close Overview Page</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
`
    $('.my-modal-container').html(modal);
}


function renderProjects() {
    var projects = gProjects;
    var projectHtml = projects.map(function(project) {
        return `
  <div class="col-md-4 col-sm-6 portfolio-item">
  <a class="portfolio-link" data-toggle="modal" href="#portfolioModal1">
    <div class="portfolio-hover" onclick="renderModal('${project.id}')">
      <div class="portfolio-hover-content">
        <i class="fa fa-plus fa-3x"></i>
      </div>
    </div>
    <img class="img-fluid" src="img/portfolio/${project.id}.png" alt="${project.name}">
  </a>
  <div class="portfolio-caption">
    <h4>${project.name}</h4>
    <p class="text-muted">JS</p>
  </div>
</div>`
    })
    $('#projects-container').html(projectHtml);
}

function onSendEmail() {
    var subject = document.querySelector('#subject-field').value
    var mailText = document.querySelector('#text-field').value
    sendEmail(subject, mailText);
    document.querySelector('#subject-field').value = '';
    document.querySelector('#text-field').value = '';
}